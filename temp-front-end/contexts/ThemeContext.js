import React, { Component, createContext } from 'react'

export const ThemeContext = createContext("DEFAULT_THEME_CONTEXT");

export class ThemeContextProvider extends Component {
    state = {
        isLightTheme: true,
        light: { syntax:'#555', ui: '#ddd', bg: '#eee'},
        dark: { syntax: '#ddd', ui: '#555', bg: '#555'}
    }
    render() {
        return (
            <ThemeContext.Provider value={this.state}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}