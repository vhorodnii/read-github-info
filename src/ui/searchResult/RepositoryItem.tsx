import * as React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export interface Repository {
  name: string;
  stars: number;
  url: string;
  author: Author;
  description: string;
  mainLanguage: string;
}

export interface Author {
  login: string;
  url: string;
}

export function RepositoryItem({ repository }: { repository: Repository }): JSX.Element {

  const buttonHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    window.open(repository.url, "_blank", "noreferrer");
  };

  return (
    <Card sx={{ margin: 1 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {repository.author.login}
        </Typography>
        <Typography variant="h5" component="div">
          {repository.name}
        </Typography>
        <Typography variant="body2">
          {repository.description}
        </Typography>
      </CardContent>
      <CardActions>
        {/* <Link href={repository.url} underline="none" target="_blank" rel="noreferrer">OPEN REPO</Link> */}
        <Button size="small" onClick={buttonHandler}>Open Repo</Button>
      </CardActions>
    </Card>
  );
}