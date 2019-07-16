@echo off
:name
    cls
    set /p name=" Repository name: "
if "%name%" == "" goto :name

:private
    cls
    echo Repository name: %name%
       set /p private=" Repository private(f = false,t = true): "
if "%private%" NEQ "f" if "%private%" NEQ "t" goto :private
set /p description=" Description (optional): " || SET description="none"

node index.js %name% "#stop&" %private% %description%
pause  
