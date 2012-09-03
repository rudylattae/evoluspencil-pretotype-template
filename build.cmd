::@echo off
@setlocal

set zip="C:\Program Files\7-Zip\7z.exe"
set here=%cd%
set base_dir=%~dp0
set dist_dir=%~dp0dist

:: Project info
set project_name=EvolusPencil-PretotypeTemplate
set project_version=0.3-dev

:: Package info
set package_source=%base_dir%%project_name%
set package_name=%project_name%-%project_version%
set package_archive=%dist_dir%\%package_name%.zip

:: setup
if not exist "%dist_dir%" (
	mkdir %dist_dir%
)
del package_archive

:: build and package
cd /d %package_source%
call %zip% a -tZip -r %package_archive% *.*

cd %here%

@endlocal