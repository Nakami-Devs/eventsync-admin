import { AppBar as RAAppBar, TitlePortal } from 'react-admin';

export const AppBar = (props: any) => {

    return(
        <RAAppBar {...props}>
            <TitlePortal />
        </RAAppBar>
    )
}