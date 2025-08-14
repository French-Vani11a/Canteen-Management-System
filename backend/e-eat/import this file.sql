-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 18, 2024 at 09:33 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_eat`
--

-- --------------------------------------------------------

--
-- Table structure for table `menu_items`
--

CREATE TABLE `menu_items` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price_in_cents` int(255) NOT NULL,
  `availability` tinyint(1) NOT NULL DEFAULT 1,
  `cook_time` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu_items`
--

INSERT INTO `menu_items` (`item_id`, `item_name`, `description`, `price_in_cents`, `availability`, `cook_time`) VALUES
(1, 'Sadza and Chicken', 'Sadza and Chicken', 2000, 1, '15'),
(3, 'Rice and Chicken', 'Rice and Chicken', 2000, 1, '10'),
(4, 'Rice and Beef', 'Rice and beef', 2000, 1, '11'),
(5, 'Chicken Burger', 'Chicken Burger', 1500, 1, '12'),
(7, '500ml Mirinda', 'Description', 1000, 0, '1'),
(19, 'Fizzi', 'Fizzi drink 500ml', 2000, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(255) NOT NULL,
  `ordered_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `total_amount_in_cents` int(255) NOT NULL,
  `transaction_verification_url` varchar(255) DEFAULT NULL,
  `is_order_done` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `ordered_at`, `total_amount_in_cents`, `transaction_verification_url`, `is_order_done`) VALUES
(5, 4, '2024-08-15 09:18:18', 6000, 'https://www.paynow.co.zw/Transaction/TransactionView/?guid=7c128001-8906-4fd2-8b1d-6f9a73ce9ed6', 0),
(6, 4, '2024-08-15 09:18:55', 43800, 'https://www.paynow.co.zw/Transaction/TransactionView/?guid=76acb9b2-9736-4e99-9bc0-6776bf5a2c76', 0),
(7, 4, '2024-08-15 10:30:31', 12000, 'https://www.paynow.co.zw/Transaction/TransactionView/?guid=b02dae35-bae2-4365-877c-9b99146e0e37', 0),
(8, 4, '2024-08-15 10:36:16', 14500, 'undefined', 0),
(9, 1, '2024-08-15 11:57:10', 6000, 'undefined', 0),
(10, 1, '2024-08-15 12:49:19', 9000, 'undefined', 0),
(11, 1, '2024-08-15 12:50:17', 12000, 'undefined', 0),
(12, 1, '2024-08-15 12:52:35', 6000, 'undefined', 0),
(13, 1, '2024-08-15 13:01:04', 3000, 'undefined', 0),
(14, 1, '2024-08-15 13:04:43', 6000, 'undefined', 0),
(15, 1, '2024-08-15 13:09:43', 13000, 'undefined', 0),
(16, 1, '2024-08-15 13:10:00', 9000, 'https://www.paynow.co.zw/Transaction/TransactionView/?guid=77b04efb-8be2-4c60-89c8-0cfdcf5ecb61', 0),
(17, 1, '2024-08-15 14:22:15', 6000, 'https://www.paynow.co.zw/Transaction/TransactionView/?guid=5b98fb28-c0d7-4005-aea0-3960beaa03cf', 0),
(18, 4, '2024-08-16 04:45:50', 4000, 'undefined', 0),
(19, 3, '2024-08-16 05:33:47', 6000, 'https://www.paynow.co.zw/Transaction/TransactionView/?guid=5f91511c-2ebe-4832-908c-5b30d97c250e', 0),
(20, 3, '2024-08-16 05:35:15', 2000, 'https://www.paynow.co.zw/Transaction/TransactionView/?guid=0cddd3d6-346a-45f8-9cd9-cf58e4518d05', 0),
(21, 3, '2024-08-16 05:37:19', 2000, 'https://www.paynow.co.zw/Transaction/TransactionView/?guid=19fb22eb-efe2-4bcf-ae08-9efe5ee10f5b', 0),
(22, 4, '2024-08-16 06:58:46', 1000, 'undefined', 0),
(23, 4, '2024-08-16 06:58:59', 4000, 'undefined', 0),
(24, 4, '2024-08-16 07:02:15', 2000, 'https://www.paynow.co.zw/Transaction/TransactionView/?guid=0507b262-179d-4d2c-a5b7-ea14dfa76e7f', 0),
(25, 4, '2024-08-16 07:06:54', 3000, 'undefined', 0),
(26, 4, '2024-08-16 07:07:36', 3000, 'https://www.paynow.co.zw/Transaction/TransactionView/?guid=2fae6d14-ecbe-4fd0-9870-4e0d078995bb', 0),
(27, 4, '2024-08-16 07:08:37', 4000, 'https://www.paynow.co.zw/Transaction/TransactionView/?guid=b47bd94f-f60b-480f-9db8-bf486b478fb5', 0),
(28, 4, '2024-08-16 07:09:41', 4000, 'undefined', 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `detail_id` int(11) NOT NULL,
  `order_id` int(255) NOT NULL,
  `item_id` int(255) NOT NULL,
  `quantity` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`detail_id`, `order_id`, `item_id`, `quantity`) VALUES
(4, 5, 12, 2),
(5, 6, 12, 2),
(6, 6, 7, 1),
(7, 6, 16, 1),
(8, 6, 11, 2),
(9, 6, 5, 1),
(10, 7, 12, 4),
(11, 8, 12, 2),
(12, 8, 12, 2),
(13, 8, 7, 1),
(14, 8, 3, 1),
(15, 9, 12, 2),
(16, 10, 12, 1),
(17, 10, 12, 1),
(18, 10, 12, 1),
(19, 11, 12, 2),
(20, 11, 12, 2),
(21, 12, 12, 2),
(22, 13, 12, 1),
(23, 14, 12, 2),
(24, 15, 12, 2),
(25, 15, 12, 2),
(26, 15, 7, 2),
(27, 16, 12, 3),
(28, 17, 12, 2),
(29, 18, 7, 2),
(30, 18, 7, 2),
(31, 19, 7, 3),
(32, 19, 7, 3),
(33, 20, 7, 2),
(34, 21, 7, 2),
(35, 22, 7, 1),
(36, 23, 7, 2),
(37, 23, 4, 1),
(38, 24, 7, 1),
(39, 24, 7, 1),
(40, 25, 5, 1),
(41, 25, 5, 1),
(42, 26, 5, 2),
(43, 27, 7, 2),
(44, 27, 7, 2),
(45, 28, 7, 2),
(46, 28, 7, 2);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--


CREATE TABLE `feedback` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    feedback TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

--
-- Table structure for table `student_db`
--

CREATE TABLE `student_db` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `student_registration_number` varchar(255) NOT NULL,
  `student_account_number` varchar(255) NOT NULL,
  `student_overall_balance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_db`
--

INSERT INTO `student_db` (`id`, `first_name`, `last_name`, `student_registration_number`, `student_account_number`, `student_overall_balance`) VALUES
(1, 'Taonga', 'Nhambi', 'TCFL3889DNJ', '123', 100800),
(2, 'Nancy', 'Drew', 'TCFL4389AKP', 'REGNUMBER2', 1250000),
(3, 'Jesse', 'Pinkman', 'TCFL12345678DF', '456', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `password_field` varchar(255) NOT NULL,
  `role` varchar(12) NOT NULL DEFAULT 'student',
  `token` varchar(256) DEFAULT NULL,
  `account_created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `token_created_at` timestamp NULL DEFAULT NULL,
  `has_completed_signup` tinyint(1) NOT NULL DEFAULT 0,
  `is_student` tinyint(1) NOT NULL DEFAULT 1,
  `student_balance` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `first_name`, `last_name`, `password_field`, `role`, `token`, `account_created_at`, `token_created_at`, `has_completed_signup`, `is_student`, `student_balance`) VALUES
(1, 'TCFL3889DNJ', 'Taonga', 'Nhambi', '123', 'student', NULL, '2024-08-18 07:32:11', NULL, 0, 1, 164580),
(2, 'TCFL4389AKP', 'Nancy', 'Drew', 'REGNUMBER2', 'student', NULL, '2024-08-13 17:29:33', NULL, 0, 1, 0),
(3, 'TCFL4389ADM', 'Tendai', 'Damba', 'ADMIN', 'admin', NULL, '2024-08-13 17:29:33', NULL, 0, 0, 0),
(4, 'TCFL12345678DF', 'Jesse', 'Pinkman', '456', 'student', NULL, '2024-08-16 07:09:41', NULL, 0, 1, 70800);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menu_items`
--
ALTER TABLE `menu_items`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`detail_id`);

--
-- Indexes for table `student_db`
--
ALTER TABLE `student_db`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `menu_items`
--
ALTER TABLE `menu_items`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `student_db`
--
ALTER TABLE `student_db`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
