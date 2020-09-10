-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 10, 2020 at 10:00 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_bus`
--

CREATE TABLE `tb_bus` (
  `bus_id` int(3) NOT NULL,
  `bus_name` varchar(30) NOT NULL,
  `bus_img` varchar(30) NOT NULL,
  `schedule_id` int(3) NOT NULL,
  `bus_station_id` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_bus`
--

INSERT INTO `tb_bus` (`bus_id`, `bus_name`, `bus_img`, `schedule_id`, `bus_station_id`) VALUES
(1, 'Sugeng Rahayu', 'bus.jpg', 1, 1),
(2, 'Eka/Mira', 'bus.img', 2, 5),
(3, 'Sumber Kencono', 'bus.img', 3, 7),
(4, 'Kramat Djati', 'bus.img', 4, 2),
(5, 'Rosalia Indah', 'bus.img', 5, 4),
(6, 'Medali Mas', 'bus.img', 6, 6),
(7, 'Raya', 'bus.img', 7, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tb_bus_station`
--

CREATE TABLE `tb_bus_station` (
  `bus_station_id` int(3) NOT NULL,
  `bus_station_from` varchar(30) NOT NULL,
  `bus_station_to` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_bus_station`
--

INSERT INTO `tb_bus_station` (`bus_station_id`, `bus_station_from`, `bus_station_to`) VALUES
(1, 'Terminal C', 'Terminal D'),
(2, 'Terminal Jombor', 'Terminal Tamanan'),
(3, 'Terminal Palbapang', '	Terminal Sukoharjo'),
(4, 'Terminal Wates', '	Terminal Padangan'),
(5, 'Terminal Wates', '	Terminal Situbondo'),
(6, 'Terminal Wates', '	Terminal Kampung Rambutan'),
(7, 'Terminal Kalideres', '	Terminal Jombor');

-- --------------------------------------------------------

--
-- Table structure for table `tb_schedule`
--

CREATE TABLE `tb_schedule` (
  `schedule_id` int(3) NOT NULL,
  `schedule_day` varchar(30) NOT NULL,
  `schedule_depature` time NOT NULL,
  `schedule_arrival` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_schedule`
--

INSERT INTO `tb_schedule` (`schedule_id`, `schedule_day`, `schedule_depature`, `schedule_arrival`) VALUES
(1, 'Senin', '15:00:00', '16:00:00'),
(2, 'Selasa', '02:00:00', '11:00:00'),
(3, 'Rabu', '04:00:00', '12:00:00'),
(4, 'Kamis', '07:00:00', '15:00:00'),
(5, 'Jumat', '22:00:00', '06:00:00'),
(6, 'Sabtu', '20:00:00', '03:00:00'),
(7, 'Minggu', '17:00:00', '02:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_bus`
--
ALTER TABLE `tb_bus`
  ADD PRIMARY KEY (`bus_id`);

--
-- Indexes for table `tb_bus_station`
--
ALTER TABLE `tb_bus_station`
  ADD PRIMARY KEY (`bus_station_id`);

--
-- Indexes for table `tb_schedule`
--
ALTER TABLE `tb_schedule`
  ADD PRIMARY KEY (`schedule_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_bus`
--
ALTER TABLE `tb_bus`
  MODIFY `bus_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tb_bus_station`
--
ALTER TABLE `tb_bus_station`
  MODIFY `bus_station_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tb_schedule`
--
ALTER TABLE `tb_schedule`
  MODIFY `schedule_id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
