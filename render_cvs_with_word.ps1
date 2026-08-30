$ErrorActionPreference = 'Stop'

$root = 'C:\Users\nguye\OneDrive\Tài liệu\CV & Motivation Letters\New CV'
$out = 'C:\website\cv_render_qc_word'
$names = @(
    'Minh Nguyen CV - GCS.docx',
    'Minh Nguyen CV - UL Solutions.docx',
    'Minh Nguyen CV - Rosewood Amsterdam.docx',
    'Minh Nguyen CV - McCain Foods.docx'
)

New-Item -ItemType Directory -Force -Path $out | Out-Null
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$word.DisplayAlerts = 0

try {
    foreach ($name in $names) {
        $input = Join-Path $root $name
        $pdf = Join-Path $out (([IO.Path]::GetFileNameWithoutExtension($name)) + '.pdf')
        $document = $word.Documents.Open($input, $false, $true)
        try {
            $document.ExportAsFixedFormat($pdf, 17)
        }
        finally {
            $document.Close($false)
        }
        Write-Output $pdf
    }
}
finally {
    $word.Quit()
}
