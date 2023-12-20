// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./Token.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Order {
    // Errors
    // For error we can use both revert and require
    error NotAnAdmin();
    error OrderIdAlreadyExist();

    // State Variables
    // type - address
    address public TokenContract;
    address[] public adminAddress;
    address[] public userAddress;

    // type - uint
    // For calculating the length of orders
    uint[] private orders;

    // type - string (Optional)
    string private constant sucess = "Request processed sucessfully";

    // Struct - Instead of declaring the variables directly we can use struct
    struct OrderDetails {
        address walletAddress;
        uint256 id;
        string product_name;
        string product_description;
        uint256 price;
        string eir_code;
    }

    // Mapping -  Used to store the data in the form of key-value pairs
    mapping(address => bool) private admins;
    mapping(uint256 => bool) private link_id_with_address;

    mapping(uint256 => OrderDetails) private orderStruct;
    mapping(address => uint[]) private linkWalletToOrders;

    // Events - it will lists to the events in the contract and emit the response once the event is completed
    event OrderCreated(
        string indexed _status,
        uint256 indexed _id,
        string indexed _product_name
    );

    // modifiers - used for validations
    // modifier onlyAdmin() {
    //     if (!admins[msg.sender]) {
    //         revert NotAnAdmin();
    //     }
    //     _; //This line is necessary
    // }

    // Constructor

    constructor(address _tokenAddress) {
        TokenContract = _tokenAddress;
    }

    // Functions

    // Write function

    function saveOrder(
        address walletAddress,
        uint256 id,
        string memory product_name,
        string memory product_description,
        uint256 price,
        string memory eir_code
    ) public {
        if (link_id_with_address[id]) {
            // Error handled by revert
            revert OrderIdAlreadyExist();
        }

        uint conversion = price * (10 ** 18);

        // Check user's token balance
        require(
            getUserTokenBalance(msg.sender) > conversion,
            "Insufficient token balance"
        );

        require(    
            //
            IERC20(TokenContract).approve(
                address(this),
                conversion
            ),
            "Transaction Failed!!!"
         );

        // Deduct tokens from the user's balance

        require(
            //
            IERC20(TokenContract).transferFrom(
                msg.sender,
                address(this),
                conversion
            ),
            "Transaction Failed!!!"
        );

        orderStruct[id] = OrderDetails(
            walletAddress,
            id,
            product_name,
            product_description,
            price,
            eir_code
        );
        orders.push(id);
        link_id_with_address[id] = true;

        // Link order ID to wallet address
        linkWalletToOrders[walletAddress].push(id);

        // Emits
        emit OrderCreated(sucess, id, product_name);
    }

    // Read function

    // Function to get order details based on wallet address
    function getOrderDetailsByAddress(
        address _walletAddress
    ) public view returns (OrderDetails[] memory) {
        uint[] memory orderIds = linkWalletToOrders[_walletAddress];
        OrderDetails[] memory orderDetailsArray = new OrderDetails[](
            orderIds.length
        );

        for (uint256 i = 0; i < orderIds.length; i++) {
            uint256 orderId = orderIds[i];
            orderDetailsArray[i] = orderStruct[orderId];
        }
        return orderDetailsArray;
    }

    function getUserTokenBalance(address user) public view returns (uint256) {
        IERC20 tokenContract = IERC20(TokenContract);
        uint256 balance = tokenContract.balanceOf(user);
        return balance;
    }

    // Function to get order details based on wallet address
    function getAllOrderDetails() public view returns (OrderDetails[] memory) {
        OrderDetails[] memory orderDetailsArray = new OrderDetails[](
            orders.length
        );

        for (uint256 i = 0; i < orders.length; i++) {
            uint256 orderId = orders[i];
            orderDetailsArray[i] = orderStruct[orderId];
        }
        return orderDetailsArray;
    }

    function deposit() external payable {
    }

    //Contract --> Address  -- withdrawal
    function withdraw(address payable _to, uint _amount) external {
        _to.transfer(_amount);
    }

    function getBalance() external view returns(uint) {
        return address(this).balance;
    }

    function getAddress() external view returns(address) {
        return address(this);
    }
}
