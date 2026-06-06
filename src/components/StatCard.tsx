import {Card, CardContent, Typography} from "@mui/material";

type StatCardProps = {
    title: string,
    value: number | undefined,
    isPending: boolean
}

export const StatCard = ({ title, value, isPending }: StatCardProps) => {
    return(
        <Card>
            <CardContent>
                <Typography variant="h4">
                    {isPending ? "Chargement..." : value ?? 0}
                </Typography>
                <Typography variant="h5" color="text.secondary">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    )
}