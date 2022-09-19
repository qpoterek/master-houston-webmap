# Webmap — Urbanization and census data in Houston, Texas

This repository contains a webmap that was originally produced in 2017 for and English class. Its aim was to showcase the relationship between US census data and the urbanization process. Artificial surfaces were extracted using a Random Forest classifier and Landsat images. The corresponding program was written in R, but is not included in this repository.

<p align="center">
	<a href="https://poterekq.github.io/master-houston-webmap/">
		<img src="https://img.shields.io/badge/-🌍_ACCESS_WEBMAP_-e0f7fa?style=for-the-badge">
	</a>
</p>

<div class="warning" style='background-color:#e1f5fe; color: #0277bd; border-left: solid #0277bd 8px; border-radius: 8px; padding: 8px 16px;'>
    <span>
        <p style='margin-top:1em;'><strong>Note</strong></p>
        <p>
        The webmap was briefly updated in September 2022, following the new standards in web development. However, the original pipeline and data were not modified.
        </p>
    </span>
</div>

## 🖥️ Technologies

<p align="center">
	<img alt="R" src="https://img.shields.io/badge/-r-276DC3?style=for-the-badge&logo=r&logoColor=white">
	<img alt="Openlayers" src="https://img.shields.io/badge/-Openlayers-039be5?style=for-the-badge&logo=openlayers&logoColor=white">
	<img alt="Vite" src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
	<img alt="JavaScript" src="https://img.shields.io/badge/-javascript-fdd835?style=for-the-badge&logo=javascript&logoColor=black">
	<img alt="NPM" src="https://img.shields.io/badge/-npm-e53935?style=for-the-badge&logo=npm&logoColor=white">
</p>

## 📁 Project structure

This project includes the following directories in the `gh-pages` branch:

- `data/` — TopoJSON files containing classification results and region of interest.
- `dist/` — Build directory.

## 🏗️ Run locally

Node.js v16.15.0 was used, but earlier versions might work too.

The following lines can be used to run the webmap in a built-in development server:

```bash
git clone https://github.com/poterekq/master-houston-webmap.git
cd master-houston-webmap
npm install
npm run dev
```