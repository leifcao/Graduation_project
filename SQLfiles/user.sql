/*
 Navicat Premium Data Transfer

 Source Server         : PhoneProject
 Source Server Type    : MySQL
 Source Server Version : 80018
 Source Host           : localhost:3306
 Source Schema         : phones

 Target Server Type    : MySQL
 Target Server Version : 80018
 File Encoding         : 65001

 Date: 10/05/2020 22:34:06
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '登录名\r\n',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '电话',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '欣喜手机',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 28 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'xx', '15812481175', '2123', '华为');
INSERT INTO `user` VALUES (2, 'admin', '13532005489', '123', '管理员');
INSERT INTO `user` VALUES (3, 'x', '12345678911', '123', '华为');
INSERT INTO `user` VALUES (4, 'x1', '12345678911', '12', '小米');
INSERT INTO `user` VALUES (5, '12', '12345678911', '12', '荣耀');
INSERT INTO `user` VALUES (6, '11111', '12345678922', '1', '华为');
INSERT INTO `user` VALUES (7, '1', '12345678933', '1', 'vivo');
INSERT INTO `user` VALUES (8, 'aa', '13456789455', '1', '苹果');
INSERT INTO `user` VALUES (10, '11', '12354678955', '11', 'OPPO');
INSERT INTO `user` VALUES (11, '222', '13548125488', '22', '荣耀');
INSERT INTO `user` VALUES (12, '32', '12548536991', '3', '小米');
INSERT INTO `user` VALUES (13, '1231', '12355589451', '11', 'OPPO');
INSERT INTO `user` VALUES (14, 'ee', '13524685201', 'ee', 'vivo');
INSERT INTO `user` VALUES (15, '520', '12345678955', '123', '一加');
INSERT INTO `user` VALUES (17, '111111', '25468520111', '11', '小米');
INSERT INTO `user` VALUES (18, '565', '12345678966', '565', '小米');
INSERT INTO `user` VALUES (19, '112121', '11233546888', '1', '苹果');
INSERT INTO `user` VALUES (20, 'xxx', '54685201111', '1', '一加');
INSERT INTO `user` VALUES (21, '小黄', '13536485201', '123', '苹果');
INSERT INTO `user` VALUES (22, '白百', '15358556869', '1', 'OPPO');
INSERT INTO `user` VALUES (23, '呵呵', '15468532157', '1', '小米');
INSERT INTO `user` VALUES (24, '白白', '13524685200', '1', '小米');
INSERT INTO `user` VALUES (25, '小星', '13524685201', '1', '小米');
INSERT INTO `user` VALUES (26, '老刘', '12354568991', '123', '小米');
INSERT INTO `user` VALUES (27, 'leif', '15812481171', '123', '荣耀');

SET FOREIGN_KEY_CHECKS = 1;
