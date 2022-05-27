import { createGlobalStyle } from "styled-components";

const Globalstyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html, body{
        height: 100%;
    }
    body {
        font-family: 'Noto Sans', sans-serif;
        margin: 0;
        padding: 0;
        background-color: ${(props) => props.theme.colors.black_900};
    }

    h1,h2,p {
        margin: 0;
        font-size: 1rem;
    }
    ol, ul, li{
        margin: 0;
        padding: 0;
        list-style-type: none;
    }
    button {
        border: none;
        outline: none;
        line-height: 0;
        cursor: pointer;
    }

    #root {
        height: 100%;
    }


    
`;

export default Globalstyle;
