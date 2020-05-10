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

 Date: 10/05/2020 22:33:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cpudesc
-- ----------------------------
DROP TABLE IF EXISTS `cpudesc`;
CREATE TABLE `cpudesc`  (
  `cid` int(255) NOT NULL AUTO_INCREMENT,
  `cpu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'cpu',
  `cpuscore` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'cpu评分',
  PRIMARY KEY (`cid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 54 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cpudesc
-- ----------------------------
INSERT INTO `cpudesc` VALUES (1, '麒麟990', '113.5');
INSERT INTO `cpudesc` VALUES (2, '骁龙855Plus', '104.4');
INSERT INTO `cpudesc` VALUES (3, '骁龙855', '102.9');
INSERT INTO `cpudesc` VALUES (4, '麒麟980', '100.3');
INSERT INTO `cpudesc` VALUES (5, '麒麟810', '99.2');
INSERT INTO `cpudesc` VALUES (6, '骁龙845', '96.5');
INSERT INTO `cpudesc` VALUES (7, '骁龙730G', '93.6');
INSERT INTO `cpudesc` VALUES (8, 'Exynos9', '92.8');
INSERT INTO `cpudesc` VALUES (9, '骁龙730AIE', '92.5');
INSERT INTO `cpudesc` VALUES (10, '骁龙765G', '92.3');
INSERT INTO `cpudesc` VALUES (11, '联发科P90', '92.2');
INSERT INTO `cpudesc` VALUES (12, '骁龙835', '89.7');
INSERT INTO `cpudesc` VALUES (13, '麒麟970', '88');
INSERT INTO `cpudesc` VALUES (14, '骁龙712AIE', '87');
INSERT INTO `cpudesc` VALUES (15, '骁龙712', '86.8');
INSERT INTO `cpudesc` VALUES (16, '骁龙710', '84');
INSERT INTO `cpudesc` VALUES (17, '骁龙821', '83.8');
INSERT INTO `cpudesc` VALUES (18, '骁龙820', '83.7');
INSERT INTO `cpudesc` VALUES (19, '骁龙675', '83.4');
INSERT INTO `cpudesc` VALUES (20, 'Exynos8', '82.9');
INSERT INTO `cpudesc` VALUES (21, '骁龙665', '82.6');
INSERT INTO `cpudesc` VALUES (22, '联发科P60', '82.4');
INSERT INTO `cpudesc` VALUES (23, '麒麟960', '82.3');
INSERT INTO `cpudesc` VALUES (24, '骁龙670', '82.2');
INSERT INTO `cpudesc` VALUES (25, '联发科P70', '80.9');
INSERT INTO `cpudesc` VALUES (26, '骁龙660', '80.1');
INSERT INTO `cpudesc` VALUES (27, '骁龙810', '78.2');
INSERT INTO `cpudesc` VALUES (28, '麒麟710', '78.1');
INSERT INTO `cpudesc` VALUES (29, '麒麟950', '77.2');
INSERT INTO `cpudesc` VALUES (30, '麒麟955', '77');
INSERT INTO `cpudesc` VALUES (31, 'MT6797', '76.8');
INSERT INTO `cpudesc` VALUES (32, '骁龙636', '75.8');
INSERT INTO `cpudesc` VALUES (33, '骁龙805', '75.5');
INSERT INTO `cpudesc` VALUES (34, '骁龙630', '74.1');
INSERT INTO `cpudesc` VALUES (35, '骁龙808', '73.8');
INSERT INTO `cpudesc` VALUES (36, 'Exynos7', '73.7');
INSERT INTO `cpudesc` VALUES (37, '骁龙625', '71.8');
INSERT INTO `cpudesc` VALUES (38, '麒麟659', '71.4');
INSERT INTO `cpudesc` VALUES (39, '骁龙626', '70.6');
INSERT INTO `cpudesc` VALUES (40, '骁龙450', '69.3');
INSERT INTO `cpudesc` VALUES (41, '麒麟658', '68.8');
INSERT INTO `cpudesc` VALUES (42, '麒麟650', '66.7');
INSERT INTO `cpudesc` VALUES (43, 'Exynos5', '66.2');
INSERT INTO `cpudesc` VALUES (44, 'MT6755', '66');
INSERT INTO `cpudesc` VALUES (45, '骁龙617', '65.4');
INSERT INTO `cpudesc` VALUES (46, '骁龙430', '65.1');
INSERT INTO `cpudesc` VALUES (47, '骁龙616', '64.6');
INSERT INTO `cpudesc` VALUES (48, '骁龙435', '64.4');
INSERT INTO `cpudesc` VALUES (49, '麒麟920', '64.1');
INSERT INTO `cpudesc` VALUES (50, '骁龙615', '63.5');
INSERT INTO `cpudesc` VALUES (51, '麒麟935', '63.3');
INSERT INTO `cpudesc` VALUES (52, 'MT6735', '55.2');
INSERT INTO `cpudesc` VALUES (53, '骁龙653', '42.1');

SET FOREIGN_KEY_CHECKS = 1;
