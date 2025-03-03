import './App.css';
import { Avatar, Box, Card, CardContent, CardHeader, Chip, Grid2, IconButton, Stack } from '@mui/material';

function App() {
  return (
    <Grid2 container columns={16} spacing={2} margin={5}>
      <Grid2 size={5}>
        <Card elevation={6}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">DT</Avatar>}
            action={
              <IconButton aria-label="settings">
                
              </IconButton>
            }
            title="Hai Dang Tran"
            subheader="Software Engineer"
          />
          <CardContent>
            <div><b>About me</b></div>
            <div>BSc Computer Science. My major interest is Software Engineering, with fluency in Distributed Systems, Java Spring Boot, web and mobile development, and graphic programming.</div>
            <div><b>Field of interest</b></div>
            <Stack 
              paddingTop={1}
              spacing={{ xs: 1, sm: 1 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}>
              <Chip label='Software Architecture'/>
              <Chip label='Cybersecurity & Forensics'/>
              <Chip label='Computer Graphic'/>
              <Chip label='Distributed System'/>
            </Stack>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 size={5}>
        <Card elevation={6}>
          <CardHeader
            title="Education"
          />
          <CardContent>
            <div><b>Memorial University of Newfoundland</b></div>
            <div>Master of Science in Computer Science</div>
            <div>From Jan 2025</div>
            <div><b>Ho Chi Minh City Vietnam National University</b></div>
            <div>Bachelor of Science in Computer Science</div>
            <div>Aug 2018 - Aug 2022</div>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 size={6}>
        <Card elevation={6}>
          <CardHeader
            title="Project"
            subheader="Localized Bitcoin wallet for Android"
          />
          <CardContent>
            <div>
              A Bitcoin wallet for Android phones without using any third party server for creating transactions or verification using the simplified model of Bitcoin verification.
            </div>
            <div>Supevisor: <a href='https://ieeexplore.ieee.org/author/38235867700'>Dr. Toan Thinh Truong</a></div>
            
            <div><b>Stacks</b></div>
            <Stack
              paddingTop={1}
              spacing={{ xs: 1, sm: 1 }}
              direction="row"
              useFlexGap
              sx={{ flexWrap: 'wrap' }}
            >
              <Chip label='Java Android App'/>
              <Chip label='Cryptographic'/>
              <Chip label='Mobile Development'/>
              <Chip label='MVVM'/>
              <Chip label='Hash Algorithms'/>
            </Stack>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}

export default App;
