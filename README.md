![Mixxi](logo.png)
#   ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎ Mixxi: A tool for mixing  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  ‏‏‎  files into one.
Mixxi is a tool written in JavaScript to mix files into one.

# Usage
Install using:

```
npm install -g mixxi
```
Once you have installed Mixxi, initiate a project using --init:

```
mixxi --init
```
You should be prompted for the files to mix together.
Once finished, press ESC to create control file.

When you are ready to mix together the files, run this command. Take note that this will remove the files you chose to mix together.
```
mixxi bundle <output_file>.js
```
Open up the output file after that, and the file should be the files you chose to mix together minified.