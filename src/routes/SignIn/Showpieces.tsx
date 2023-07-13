import React, { useEffect, useState } from "react";
import { Grid, Placeholder, Segment, Transition } from "semantic-ui-react";



export function Showpieces() {
    const NUM_SHOWPIECES = 5;
    const SHOWPIECE_TIMEOUT = 200;
    const [showpieceToggle, setShowpieceToggle] = useState(new Array(NUM_SHOWPIECES).fill(true));
    const [showpieceToggleSelector, setShowpieceToggleSelector] = useState(1);
    useEffect(() => {
        setShowpieceToggle((showpieceToggle)=>{return showpieceToggle.map((x,i)=>{if(i===showpieceToggleSelector) return !x; else return x;})})
    }, [showpieceToggleSelector]);
    const showpieces = [];

    useEffect(()=>{
        const x = setTimeout(()=>{
            setShowpieceToggleSelector((x)=> (x+1)%NUM_SHOWPIECES);
        }, SHOWPIECE_TIMEOUT)
        return ()=>clearTimeout(x);
    }, [showpieceToggle]);

    for(let i=0;i<NUM_SHOWPIECES;i++){
        showpieces.push(<Grid.Column key={'showpiece'+i}>
            <Transition
                animation='pulse'
                duration={500}
                visible={showpieceToggle[i]}
            >
                <Segment raised>
                    <Placeholder>
                        <Placeholder.Header image>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line length='medium' />
                            <Placeholder.Line length='short' />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Segment>
            </Transition>
        </Grid.Column>)
}
    return <Grid centered stackable columns={2}>
        {showpieces}
    </Grid>;
}
