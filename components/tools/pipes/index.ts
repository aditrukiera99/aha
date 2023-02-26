// @ts-nocheck
import moment from "moment";
moment.locale('id');

export class Pipes {

    //  Capitalize each word

    static capitalizeFirst = (str: any) => {
        let str_str:string = str ?? '';
        let a = str_str.toLowerCase();
        return a.charAt(0).toUpperCase() + a.slice(1);
    };

    static capitalizeEachWord = (str: any) => {
        if (str) {
            let a = str.toLowerCase();
            return a.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        }
        return '-';
    };

    // Limit character and add "..." at the end

    static strLimiter(str: any) {
        if (str) {
            return str.replace(/^(.{30}[^\s]*).*/, "$1" + "..."); 
        }
        return "-";
    }

    //  Using moment.js to replace date format

    static dateDMY = (str: any) => {
        if (str) {            
            return moment(str).format('DD MMM YYYY');
        }
        return "-";
    };

    static dateYMDWithDashed = (str: any) => {
        if (str) {            
            return moment(str).format('YYYY-MM-DD');
        }
        return "-";
    };

    static dateMY = (str: any) => {
        if (str) {            
            return moment(str).format('MMMM YYYY');
        }
        return "-";
    };

    // Take only first char each word and capitalize

    static nameInitial = (str: any) => {
        if (str) {
            let a = str.toLowerCase();
            return a.match(/(^\S\S?|\b\S)?/g).join("").match(/(^\S|\S$)?/g).join("").toUpperCase();
        }
        return '-';
    };

    // Check if empty and replace with "not set"

    static emptyChecker = (str: any, returnEmptyString?: boolean) => {
        return str ? str : (
            returnEmptyString ? '' : "not set"
        );
    };

    // Replacing underscore with space and capitalize each word

    static capitalizeAndDelUnderscores = (str: any) => {
        let str_str:string = str ?? '';
        let a = str_str.toLowerCase();
        return a.replace(/(^|_)./g, s => s.slice(-1).toUpperCase()).replace(/([A-Z])/g, ' $1');
    }
}