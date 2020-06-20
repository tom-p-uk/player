import React from 'react';

import Rail from './components/Rail/Rail';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Player from './components/Player/Player';
import * as railsService from './services/rails';

import styles from './app.css';

class App extends React.PureComponent {
    state = {
        activeTileId: null,
        rails: [],
        isLoading: true
    };

    handleLinkClick = this.handleLinkClick.bind(this);

    async componentDidMount() {
        let railsData;

        window.addEventListener('click', this.handleLinkClick);

        try {
            railsData = await railsService.get();

            this.setState({
                rails: railsData
            });
        } catch (err) {
            console.error(err);
        }

        this.setState({
            isLoading: false
        });
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleLinkClick);
    }

    handleLinkClick(e) {
        const { target } = e;
        const link = target.matches('a') ? target : target.closest('a');

        if (!link) return;

        e.preventDefault();

        const { href } = link;
        const segments = new URL(href).pathname.substring(1).split('/');
        const activeId = segments[1];

        this.setActiveTile(activeId);
    }

    setActiveTile(nextActiveTileId) {
        this.setState({
            activeTileId: nextActiveTileId
        });
    }

    render() {
        return (
            <>
                <Header />
                <main className={styles.appMain}>
                    <Player />
                    <div>
                        {this.state.rails.map(rail => (
                            <Rail
                                {...rail}
                                key={rail.id}
                                activeTileId={this.state.activeTileId} />
                        ))}
                    </div>
                </main>
                <Footer />
            </>
        );
    }
}

export default App;
