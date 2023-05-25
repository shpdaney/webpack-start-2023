import Post from "./post";
import '../styles/index.css'

import WebpackLogo from '../assets/images/webpack-logo.png'



const post = new Post('Webpack post title', WebpackLogo);

console.log('Post to string:', post.toString());
