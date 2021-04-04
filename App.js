
import './App.css';
import { useState, useEffect } from 'react';

import axios from 'axios';

import {
    Typography,
    Grid,
    IconButton,
    Paper
} from "@material-ui/core";

import FileCopyIcon from "@material-ui/icons/FileCopy";


function App() {

    const [links, setLinks] = useState([]);

    useEffect(() => {
        axios.get(`https://raw.githubusercontent.com/LorenzoTinfena/LorenzoTinfena/master/server/u`)
            .then(res => setLinks(res.data))
    }, [])

    /*const links = [
        { title: "primo link", url: "23270ff51881.ngrok.io" },
        { title: "primo link", url: "23270ff51881.ngrok.io" },
        { title: "primo link", url: "23270ff51881.ngrok.io" }
    ];*/
//https://raw.githubusercontent.com/LorenzoTinfena/LorenzoTinfena/master/server/urls.json
return (
    <>
        <Paper
            style={{ width: "50vw", padding: 10, margin: "auto", marginTop: 100 }}>
            <Grid
                justify="center"
                alignItems="center"
                container>
                <Grid item xs="auto" style={{ margin: 10, marginBottom: 20 }}>
                    <Typography variant="h5">I MIEI LINK</Typography>
                </Grid>
                {links.map(({ title, url }) => (
                    <Grid item xs="12">
                        <Grid
                            container
                            direction="row"
                            alignItems="center">
                            <Grid item xs="3">
                                <Typography align="center">{title}</Typography>
                            </Grid>
                            <Grid item xs="5">
                                <Typography align="center">{url}</Typography>
                            </Grid>
                            <Grid item xs="1">
                                {" "}
                                <IconButton
                                    onClick={() => navigator.clipboard.writeText(url)}>
                                    <FileCopyIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    </>
);
}

export default App;
