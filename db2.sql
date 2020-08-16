-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : Dim 16 août 2020 à 10:07
-- Version du serveur :  10.4.13-MariaDB
-- Version de PHP : 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gifts`
--

-- --------------------------------------------------------

--
-- Structure de la table `assets`
--

CREATE TABLE `assets` (
  `id` int(11) NOT NULL,
  `generic_asset` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `generic_asset`
--

CREATE TABLE `generic_asset` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(300) DEFAULT NULL,
  `type` set('productive','entertaining','raw','information','symbolic','assuring','other') NOT NULL,
  `ephemeral` tinyint(1) NOT NULL DEFAULT 1,
  `expiration` time DEFAULT '838:59:59' COMMENT 'delta time between creation date and expiration date. expressed in Time type',
  `atomic` tinyint(4) DEFAULT 0,
  `valuable_exchange` tinyint(4) DEFAULT 1,
  `unicode` char(2) DEFAULT NULL,
  `media` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `possession`
--

CREATE TABLE `possession` (
  `id` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `asset` int(11) DEFAULT NULL,
  `time` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `seen` date NOT NULL DEFAULT current_timestamp(),
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` set('admin','contributor','user','') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user` int(11) DEFAULT NULL,
  `asset` int(11) DEFAULT NULL,
  `time` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `generic_asset` (`generic_asset`);

--
-- Index pour la table `generic_asset`
--
ALTER TABLE `generic_asset`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `possession`
--
ALTER TABLE `possession`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `asset` (`asset`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user` (`user`),
  ADD KEY `asset` (`asset`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `assets`
--
ALTER TABLE `assets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=905;

--
-- AUTO_INCREMENT pour la table `generic_asset`
--
ALTER TABLE `generic_asset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `possession`
--
ALTER TABLE `possession`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_ibfk_1` FOREIGN KEY (`generic_asset`) REFERENCES `generic_asset` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `possession`
--
ALTER TABLE `possession`
  ADD CONSTRAINT `possession_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `possession_ibfk_2` FOREIGN KEY (`asset`) REFERENCES `assets` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`asset`) REFERENCES `assets` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
