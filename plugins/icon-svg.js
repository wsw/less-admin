/**
 * 字体图标, 统一使用SVG Sprite矢量图标(http://www.iconfont.cn/）
 *
 * 使用:
 *  1. 在阿里矢量图标站创建一个项目, 并添加图标(这一步非必须, 创建方便项目图标管理)
 *  2. 添加icon, 选中新增的icon图标, 复制代码 -> 下载 -> SVG下载 -> 粘贴代码(重命名)
 *  3. 组件模版中使用 [<icon-svg name="canyin"></icon-svg>]
 *
 */
import Vue from 'vue'
import IconSvg from '@/components/icon-svg'

Vue.component('IconSvg', IconSvg)

// 导入多个文件
const svgFiles = require.context('@/components/icon-svg/svg', true, /\.svg$/)
const iconList = svgFiles.keys().map(item => svgFiles(item))

Vue.prototype.icons = iconList.map(item => item.default.id.replace('icon-', ''))

// const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
// svgRule.exclude = [resolve(__dirname, 'components/icon-svg/svg')]
//
// // Includes svg for svg-sprite-loader
// config.module.rules.push({
//   test: /\.svg$/,
//   include: [resolve(__dirname, 'components/icon-svg/svg')],
//   loader: 'svg-sprite-loader',
//   options: {
//     symbolId: '[name]'
//   }
// })
