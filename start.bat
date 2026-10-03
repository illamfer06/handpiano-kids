@echo off
setlocal EnableExtensions

cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
	echo ERROR: Node.js no esta instalado o no esta en PATH.
	exit /b 1
)

where npm >nul 2>&1
if errorlevel 1 (
	echo ERROR: npm no esta disponible en PATH.
	exit /b 1
)

if not exist "frontend\node_modules" (
	echo Instalando dependencias del frontend...
	pushd frontend
	call npm install
	if errorlevel 1 (
		popd
		echo ERROR: No se pudieron instalar las dependencias del frontend.
		exit /b 1
	)
	popd
)

echo Iniciando frontend en http://localhost:5173...
start "HandPiano Kids - Frontend" /D "%~dp0frontend" cmd /k npm run dev

timeout /t 3 /nobreak >nul
start "" "http://localhost:5173"

where java >nul 2>&1
if errorlevel 1 (
	echo AVISO: Java 21 o superior no esta instalado o no esta en PATH.
	echo El frontend esta funcionando; el backend no se ha iniciado.
	goto :done
)

where mvn >nul 2>&1
if errorlevel 1 (
	echo AVISO: Maven no esta instalado o no esta en PATH.
	echo El frontend esta funcionando; el backend no se ha iniciado.
	goto :done
)

echo Iniciando backend en http://localhost:8080...
start "HandPiano Kids - Backend" /D "%~dp0backend" cmd /k mvn spring-boot:run

echo.
echo Backend:  http://localhost:8080/api/health
echo Frontend: http://localhost:5173
echo.
echo Cierra las ventanas de Backend y Frontend para detener la aplicacion.

:done
endlocal
