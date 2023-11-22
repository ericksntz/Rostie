-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 22/11/2023 às 06:04
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


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
-- Estrutura para tabela `ingredient`
--

CREATE TABLE `ingredient` (
  `id` int(11) NOT NULL,
  `id_recipe` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `quantidade` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `ingredient`
--

INSERT INTO `ingredient` (`id`, `id_recipe`, `nome`, `quantidade`) VALUES
(1, 1, 'Ovo', '3'),
(2, 1, 'Coco', '200 gramas'),
(3, 2, 'Chocolate', ''),
(4, 2, 'Farinha', ''),
(5, 2, 'Manteiga', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `qntd` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  `id_user` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `item`
--

INSERT INTO `item` (`id`, `nome`, `qntd`, `idCategoria`, `id_user`) VALUES
(27, 'Chocolate', 3, 10, 119),
(28, 'Farinha', 3, 2, 119),
(29, 'Manteiga', 3, 10, 119);

-- --------------------------------------------------------

--
-- Estrutura para tabela `recipe`
--

CREATE TABLE `recipe` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `recipe`
--

INSERT INTO `recipe` (`id`, `nome`, `image`) VALUES
(1, 'Manjar', 'manjar.jpeg'),
(2, 'Brownie', 'brownie.jpeg'),
(3, 'Pudim', 'pudim.jpeg');

-- --------------------------------------------------------

--
-- Estrutura para tabela `step`
--

CREATE TABLE `step` (
  `id` int(11) NOT NULL,
  `etapa` varchar(510) NOT NULL,
  `id_recipe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `step`
--

INSERT INTO `step` (`id`, `etapa`, `id_recipe`) VALUES
(3, 'Mexer', 1),
(4, 'Assar', 1),
(5, 'Derreta a manteiga e o chocolate', 2),
(6, 'Adicione a farinha', 2),
(7, 'Asse', 2),


-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `user`
--

INSERT INTO `user` (`id`, `nome`, `email`, `senha`) VALUES
(119, 'Crente', 'crente@crente.com', 'crente'),
(121, 'Humberto', 'humbertomurad@hotmail.com', 'Teste123@'),

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `ingredient`
--
ALTER TABLE `ingredient`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ingredient_recipe` (`id_recipe`);

--
-- Índices de tabela `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`),
  ADD KEY `fk_item_categoria` (`idCategoria`);

--
-- Índices de tabela `recipe`
--
ALTER TABLE `recipe`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `step`
--
ALTER TABLE `step`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_step_recipe` (`id_recipe`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `ingredient`
--
ALTER TABLE `ingredient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de tabela `recipe`
--
ALTER TABLE `recipe`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `step`
--
ALTER TABLE `step`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `ingredient`
--
ALTER TABLE `ingredient`
  ADD CONSTRAINT `fk_ingredient_recipe` FOREIGN KEY (`id_recipe`) REFERENCES `recipe` (`id`);

--
-- Restrições para tabelas `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `fk_item_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`id`);

--
-- Restrições para tabelas `step`
--
ALTER TABLE `step`
  ADD CONSTRAINT `fk_step_recipe` FOREIGN KEY (`id_recipe`) REFERENCES `recipe` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
