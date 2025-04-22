import gordon from '../assets/Gordon_Ramsay.png';
import jamie from '../assets/JamieOliver.jpg';
import julia from '../assets/JuliaChild.jpg';
import jack from '../assets/jack-black.png';
import bigsmoke from '../assets/big-smoke.png';
import nick from '../assets/nick-cook.png';
import carmy from '../assets/carmy.png';
import chef from '../assets/burger-assistant-icon.png';
import burger from "../assets/Burger.svg";
import cookie from "../assets/Choco_cookie.jpg";
import curry from "../assets/jap-curry.png";
import friedChicken from "../assets/korean-fried-chicken.png";
import lamb from "../assets/lamb-skewer.png";
import CostSlider from '../components/CostSlider';
import cornbread from "../assets/cornbread.png";
import shrimp from "../assets/shrimp.png";
import porkchop from "../assets/pork-chop.png";
import peppers from "../assets/peppers.png";
import sloppy from "../assets/sloppy.png";
import meatballs from "../assets/meatballs.png";


export const cleanUsername = (user) => {
    return user.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

export const turnUsernameToUrl = (user) => {
    return user.replace(/\s+/g, '-').toLowerCase();
}

export const turnRecipeToUrl = (recipe) => {
    return recipe.replace(/\s+/g, '-').toLowerCase();
}

export const getUserImage = (username) => {
    if (username === 'Gordon Ramsay') {
      return gordon;
    } else if (username === 'Jamie Oliver') {
      return jamie;
    } else if (username === 'Julia Child') {
      return julia;
    } else if (username === 'Jack Black') {
      return jack;
    } else if (username === 'Big Smoke') {
      return bigsmoke;
    } else if (username === 'Nick') {
      return nick;
    } else if (username === 'Carmy Berzatto') {
      return carmy;
    } else if (username === "Lil' Chef") {
      return chef; // Add the image path for Lil' Chef here
    } else { // Default case
      return gordon;
    }
};

export const getRecipeImage = (recipe) => {
    if (recipe === 'Chicken Burger') {
        return burger;
    } else if (recipe === 'Cornbread') {
        return cornbread;
    } else if (recipe === 'Shrimp') {
        return shrimp;
    } else if (recipe === 'Pork Chop') {
        return porkchop;
    } else if (recipe === 'Peppers') {
        return peppers;
    } else if (recipe === 'Sloppy Joe') {
        return sloppy;
    } else if (recipe === 'Meatballs') {
        return meatballs;
    } else if (recipe === 'Chocolate Cookie') {
        return cookie;
    } else if (recipe === 'Japanese Curry') {
        return curry;
    } else if (recipe === 'Korean Fried Chicken') {
        return friedChicken;
    } else if (recipe === 'Lamb Skewer') {
        return lamb;
    }
    return '';
}