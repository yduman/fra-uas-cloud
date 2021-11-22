import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";

import TextInput from "../common/TextInput";

export function LoginForm() {
  return (
    <Card sx={{ minWidth: 400 }}>
      <CardHeader title="Login" />
      <CardContent>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item xs={12} sx={{ minWidth: 400 }}>
            <TextInput type="text" label="Username" isRequired isFullWidth />
          </Grid>
          <Grid item xs={12} sx={{ minWidth: 400 }}>
            <TextInput
              type="password"
              label="Password"
              isRequired
              isFullWidth
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Grid container direction="row" justifyContent="flex-end">
          <Grid item>
            <Button variant="contained">Login</Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
