# App CI/CD Pipeline

## CI/CD architecture
![CI/CD diagram](images/CICD.png)
Pull request to 'main' branch from 'frontend' or 'backend' branches trigger CI workflow including:
- Code linting:
  - 'Eslint frontend' and 'Eslint backend' workflows are triggered when pull request coming from branch containing 'frontend' and 'backend', respectively
- Running tests
  - Running tests and produce test reports (saved in 'reports/' directory)
  - 'backend tests' and 'frontend tests' workflows are riggered when pull request coming from branch containing 'frontend' and 'backend', respectively
- Build and push image to Github Container Registry
  - build and push images for 'development' and 'production' environment
  - tag images with version tag input
- Remove untagged images
