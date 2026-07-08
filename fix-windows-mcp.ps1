# Esegui come Amministratore: tasto destro -> "Esegui con PowerShell" (come admin)
# Fix per Windows-MCP bloccato da Windows (errore 4551)

$ErrorActionPreference = 'Stop'

$extPath = "$env:APPDATA\Claude\Claude Extensions\ant.dir.cursortouch.windows-mcp"
$uvPath  = "$env:USERPROFILE\.local\bin\uv.exe"
$venvExe = "$extPath\.venv\Scripts\windows-mcp.exe"

Write-Host "=== Fix Windows-MCP per Claude ===" -ForegroundColor Cyan

# 1. Esclusioni Windows Defender
Write-Host "`n[1/3] Aggiungo esclusioni Windows Defender..."
Add-MpPreference -ExclusionPath $extPath
Add-MpPreference -ExclusionPath "$extPath\.venv"
Add-MpPreference -ExclusionPath $uvPath
Write-Host "OK" -ForegroundColor Green

# 2. Sblocca file (Mark of the Web)
Write-Host "`n[2/3] Sblocco file estensione..."
Get-ChildItem -LiteralPath $extPath -Recurse -File | Unblock-File -ErrorAction SilentlyContinue
Write-Host "OK" -ForegroundColor Green

# 3. Test avvio
Write-Host "`n[3/3] Test windows-mcp..."
& $uvPath --directory $extPath run windows-mcp --help | Select-Object -First 3
if ($LASTEXITCODE -eq 0) {
    Write-Host "`nSUCCESSO: windows-mcp funziona. Riavvia Claude Desktop." -ForegroundColor Green
} else {
    Write-Host "`nATTENZIONE: test fallito (exit $LASTEXITCODE)." -ForegroundColor Yellow
    Write-Host "Disattiva Smart App Control:" -ForegroundColor Yellow
    Write-Host "  Impostazioni -> Privacy e sicurezza -> Sicurezza Windows" -ForegroundColor Yellow
    Write-Host "  -> Controllo app e browser -> Impostazioni Smart App Control -> Off" -ForegroundColor Yellow
}

Write-Host "`nPremi un tasto per chiudere..."
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
