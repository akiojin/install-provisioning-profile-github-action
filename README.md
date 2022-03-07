# install-provisioning-profile-github-action
This action installs the provisioning profile in the environment and uninstalls it at the end of the workflow.


## Usage
### Simple usage - (1)
```yml
- uses: akiojin/install-provisioning-profile-github-action@v1.0
  with:
    base64: ${{ secrets.PROVISIONING_PROFILE_BASE64 }}
```

### Simple usage - (2)
```yml
- uses: akiojin/install-provisioning-profile-github-action@v1.0
  with:
    path: <Provisioning Profile path>
```

## Additional Arguments
See [action.yml][0] for more details.

- `base64`
  - **Requied**: false
  - **Type**: string
  - **Description**: Base64-encoded data for the provisioning profile used. May be omitted if 'path' is specified. If 'path' is also specified, this parameter takes precedence.
- `path`
  - **Requied**: false
  - **Type**: string
  - **Description**: Path of the provisioning profile to be used. If 'base64' is not specified, this parameter cannot be omitted.

## License
Any contributions made under this project will be governed by the [MIT License][1].

[0]: https://github.com/akiojin/install-provisioning-profile-github-action/blob/main/action.yml
[1]: https://github.com/akiojin/install-provisioning-profile-github-action/blob/main/LICENSE