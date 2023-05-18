# Contributing to the Voyager Translations

Here's a simple guide on how you can contribute a new language for [voyager](https://voyager.online)

All the files required to contribute for a new language are present here in this repository itself, so not needed to go anywhere.

Steps to Contribute

- Step 1: Forking this Repository
  - If you don't have github account you can create it [here](https://github.com/signup)
  - To fork this repository to you account you can click on the fork button at top of this repository home page
    - This will redirect you to a new page, which is simply asking you to give it a name and then it will be present on your account
    - You can read more about forking [here](https://docs.github.com/en/get-started/quickstart/fork-a-repo)
- Step 2: Cloning this Repository
  - Once the repository is forked, Goto the page where you have forked this repository
  - Click on the `Code` button
    - ![](https://docs.github.com/assets/cb-32892/mw-1440/images/help/repository/code-button.webp)
  - Then Copy the URL to the repository which should be like `https://github.com/YOUR_USERNAME/voyager-translations.git` or `git@github.com:YOUR_GITHUB_USERNAME/voyager-translations.git`
    - ![](https://docs.github.com/assets/cb-88716/mw-1440/images/help/repository/https-url-clone-cli.webp)
  - Then goto your desktop and open a terminal and run command
    - `git clone URL_WHICH_YOU_HAVE_COPIED_ABOVE`
  - After cloning, you should have a folder name `voyager-translations` inside the folder where you have ran the above command
- Step 3: Creating a new branch
  - After Cloning, Goto inside that folder from your terminal with a command like
    - `cd voyager-translations`
  - Then create a new branch for which language you want to contribute for e.g `jp` for japanese, `hi` for hindi
    - `git branch -b YOUR_LANGUAGE_BRANCH`
- Step 4: Making Changes
  - Once you have changed your branch, open your code editor e.g VS Code
    - You can do it for example like `code .` from terminal itself if you have vscode install
    - Alternatively, you can open VS Code, and Use `Open a Project` from file menu, and navigate to `voyager-translations` folder.
  - Then make a copy the `en` folder
    - For command line folks you can use `cp -r ./en ./YOUR_LANGUAGE`
  - After making a copy rename that `en copy` folder to the language for which you want contribute for e.g `jp`
  - Then navigate to the file `YOUR_LANGUAGE/translations.json` and open that in editor
    - For example here in our case it would be `jp/translations.json`
  - In the file you can see a structure
    ```
    ...
    "blocks": "Blocks",
    "transactions": "Transactions",
    "contracts": "Contracts",
    ...
    ```
    - Now, we just have to translate All the `English` Text Such as `"Blocks"`, `"Transactions"`, ... to the language for which we want to contribute
  - Once done make sure to save you file.
- Step 5: Commiting your change
  - Now, we have made the contribution and all the changes are present in the file for our language e.g `jp/translations.json`. We just have to commit our changes in git and we are ready to make a PR (Pull Request).
  - To commit to the changes goto your terminal, inside the `voyager-translations` folder
    - Then to commit `git commit -m "YOUR MESSAGE FOR THE COMMIT e.g Japanese Translation"`
    - If the above command did ran successfully we have commit to our changes.
  - Not to send out changes to github
    - We can send it via `git push`
    - NOTE: If you get error like `fatal: The current branch YOUR_BRANCH_NAME has no upstream branch.`, don't panic just use the command mentioned below.
        - Which should be something like `git push --set-upstream origin YOUR_BRANCH_NAME`
  - If we have pushed successfully, we can view that branch in our github account in web browser
- Step 6: Creating a PR(Pull Request)
  - This is the final step to make your contribution to be included in the translations.
  - Creating a PR is simple, You navigate to your branch in the github repository page.
  - Then Click `Contribute` and then `Open a pull request` to the `main` repository
