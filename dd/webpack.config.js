const path=require('path');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');
const htmlWebpackPlugin=require('html-webpack-plugin');
const autoprefixer=require('autoprefixer');
const miniCssExtractPlugin=require('mini-css-extract-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config={
    mode:'developement',
    performance: {
        hints: false
     },
    optimization:{
        minimizer:[
            new OptimizeCssAssetsPlugin(),
            new UglifyJsPlugin({
                cache:true,
                sourceMap:true
            })
        ]
    },
    entry:{
        index:path.resolve(__dirname,'./src/index.js')
    },
    output:{
        path:path.resolve(__dirname+'/dist'),
        filename:'js/[name].js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                loader:'babel-loader',
                include:[
                    path.resolve(__dirname,'src')
                ],
                exclude:path.resolve(__dirname,'node_moudules'),
                options:{
                    presets:['@babel/preset-env','@babel/preset-react'],
                    plugins:['@babel/plugin-proposal-class-properties',
                    "@babel/plugin-transform-runtime",
                    "@babel/plugin-transform-spread",
                    //"@babel/plugin-syntax-dynamic-import"
                ],
                }
                // query:{
                //     'preset':['lasest']
                // }
            },
            {
                test:/\.tpl$/,
                loader:'ejs-loader'
            },
            {
                test:/\.css$/,
                use:[
                    {
                        loader:miniCssExtractPlugin.loader,
                        options:{
                        hmr:process.env.NODE_ENV==='development'
                        }   
                    },
                    //'style-loader',///load to style header, miniCssExtractPlugin will be ignored
                    'css-loader',
                    // {
                    //     loader:'postcss-loader',
                    //     options:{
                    //         plugins:function(){
                    //             return[autoprefixer('last 5 versions')]
                    //         }
                    //     }
                    // },
                    // 'sass-loader'
                ]
            },
            {
                test:/\.(png|jpg|jpeg|gif|ico|svg)$/i,
                use:{
                    loader:'file-loader'
                    ,options:{
                        outputPath:'images'
                    }
                }
                // loader:[
                //     'url-loader?limit=1024&name=/images/[name][hash].[ext]',
                //     'image-webpack-loader'
                // ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: './src/favicon.ico' , to: path.resolve(__dirname+'/dist'), }
        ]),
        new htmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html',
            title:"DnD",
            favicon: './src/favicon.ico',
            chunksSortMode:"manual",
            chunks:["index"],
            excludeChunks:["node-moudules"],
            hash:true,
            minify:{
                removeComments:true,
                collapseWhitespace:true
            }
        }),
        new miniCssExtractPlugin({
            filename:'[name].css'
        })
    ],
    //devtool:'cheap-source-map',
    devServer:{
        watchOptions:{
            ignored:'node_moudules'
        },
        // contentBase:path.resolve(__dirname,"dist"),
        port:8080,
        host:'localhost',
        overlay:true,
        compress:true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
          }
    }
}

module.exports = config;