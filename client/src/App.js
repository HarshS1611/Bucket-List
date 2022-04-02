import React, { useEffect , useState } from "react";
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Form from './Components/Form/form';
import Posts from './Components/Posts/posts';
import { getPosts } from './actions/posts';
import useStyles from './styles';
import memories from './images/memories.png';

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentid , setCurrentid] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentid,dispatch]);


    return (
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Bucket List </Typography>
                <img className={classes.image} src={memories} alt="icon" height="60" />
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentid={setCurrentid} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentid={currentid} setCurrentid={setCurrentid} />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App;