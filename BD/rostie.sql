-- database: :memory:
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 19/11/2023 às 17:28
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `rostie`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categoria`
--

INSERT INTO `categoria` (`id`, `nome`) VALUES
(1, 'Verdura e Legumes'),
(2, 'Grãos e Cereais'),
(3, 'Temperos e Ervas'),
(4, 'Proteínas'),
(5, 'Massas'),
(6, 'Laticínios'),
(7, 'Frutas'),
(8, 'Gorduras e Óleos'),
(9, 'Nozes e Sementes'),
(10, 'Outros');

-- --------------------------------------------------------

--
-- Estrutura para tabela `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `idDispensa` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `qntd` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `vencimento` date DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pantry`
--

CREATE TABLE `pantry` (
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idItem` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(60) NOT NULL,
  `idDispensa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `user`
--

INSERT INTO `user` (`id`, `nome`, `email`, `senha`, `idDispensa`) VALUES
('Crente', 'teste@teste.com', 'teste', 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `pantry`
--
ALTER TABLE `pantry`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pantry`
--
ALTER TABLE `pantry`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

--
-- FOREIGN KEY ADDED
--

-- Adicionando chave estrangeira na tabela `item` referenciando a tabela `categoria`
ALTER TABLE `item`
  ADD CONSTRAINT `fk_item_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`id`);

-- Adicionando chave estrangeira na tabela `pantry` referenciando as tabelas `user` e `item`
ALTER TABLE `pantry`
  ADD CONSTRAINT `fk_pantry_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_pantry_item` FOREIGN KEY (`idItem`) REFERENCES `item` (`id`);

-- Adicionando chave estrangeira na tabela `user` referenciando a tabela `pantry`
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_pantry` FOREIGN KEY (`idDispensa`) REFERENCES `pantry` (`id`);
