module.exports = {
  plugins: [
    require('autoprefixer')({ // 自動でベンダープレフィックスを付与
      "overrideBrowserslist": [ // 対象ブラウザの設定
        "last 2 versions",
        "ie >= 11",
        "Android >= 4",
        "> 0.5%",
        "> 1% in JP",
      ],
      grid: true,
    })
  ]
};
