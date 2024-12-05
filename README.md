# Palette Creator (MVPOC)

- **Step 1:** Add colours
- **Step 2:** Adjust point count

<img src="./asset/screenshot-001.png" />

## Possible future features

- Other visualisation modes (bin packing, gradients...)
- Improve the circle packing algo perhaps
- Export in hex, RGB, 0 - 1 range palettes
- Color space adjustment
- 'Generate palette' option
- Saving snapshots / naming palettes

## GCR Deploy

The app is built into a Docker image that serves it with nginx. The headline steps are:

1. Build is triggered by a Github action
2. That image is pushed to the Google container registry
3. The container is deployed to Google Cloud Run

The Github action is based on these [examples](https://github.com/google-github-actions/example-workflows/tree/main/workflows/deploy-cloudrun), which also include a way to create a `service.yaml` allowing you to configure the instance.

- More information on [GCR's container requirements](https://cloud.google.com/run/docs/container-contract).
- Information on creating a service account [here](https://cloud.google.com/blog/products/identity-security/secure-your-use-of-third-party-tools-with-identity-federation) and [here](https://azeezz.medium.com/from-code-to-cloud-github-actions-for-cloud-run-deployment-dc1304573642).
- Example permissions:
  - `roles/artifactregistry.writer`
  - `roles/iam.serviceAccountUser`
  - `roles/run.admin`
  - `roles/iam.workloadIdentityUser`
