import gordon from '../assets/Gordon_Ramsay.png';
import jamie from '../assets/JamieOliver.jpg';
import julia from '../assets/JuliaChild.jpg';


export const cleanUsername = (user) => {
    return user.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

export const turnUsernameToUrl = (user) => {
    return user.replace(/\s+/g, '-').toLowerCase();
}

export const getUserImage = (username) => {
    if (username === 'Gordon Ramsay') {
      return gordon;
    } else if (username === 'Jamie Oliver') {
      return jamie;
    } else if (username === 'Julia Child') {
      return julia;
    }
};