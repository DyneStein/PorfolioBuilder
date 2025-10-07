$content = Get-Content "code-generation.html" -Raw
$content = $content -replace 'The easiest way to deploy your Next.js app is to use the \[Vercel Platform\]\(https://vercel.com/new\)\.`', 'The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).`'
Set-Content "code-generation.html" $content -NoNewline
Write-Host "Fixed template literal!"

