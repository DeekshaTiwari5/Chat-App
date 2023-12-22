const { exec } = require('child_process');

// Function to run build commands for each folder
function buildFolder(folderName, buildCommand) {
  return new Promise((resolve, reject) => {
    const buildProcess = exec(`cd ${folderName} && ${buildCommand}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error building ${folderName}: ${stderr}`);
        reject(error);
      } else {
        console.log(`Successfully built ${folderName}: ${stdout}`);
        resolve();
      }
    });

    buildProcess.stdout.on('data', (data) => {
      console.log(data);
    });

    buildProcess.stderr.on('data', (data) => {
      console.error(data);
    });
  });
}

// Build and deploy process
async function deploy() {
  try {
    // Run build for the server
    await buildFolder('server', 'npm run build');

    // Run build for the public folder
    await buildFolder('public', 'npm run build');

    // Deploy your built files here
    // For instance, copy files to a server or another location
    console.log('Deployment completed successfully!');
  } catch (err) {
    console.error('Deployment failed:', err);
  }
}

// Run deployment
deploy();