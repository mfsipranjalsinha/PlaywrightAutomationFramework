function Show-Tree {
    param (
        [string]$Path = ".",
        [string[]]$Exclude = @("node_modules", "playwright-report", "test-results")
    )

    function Get-Tree($Path, $Prefix = "") {
        $items = Get-ChildItem -LiteralPath $Path | Where-Object {
            $Exclude -notcontains $_.Name
        }

        for ($i = 0; $i -lt $items.Count; $i++) {
            $item = $items[$i]
            $isLast = ($i -eq $items.Count - 1)

            $branch = if ($isLast) { "+-- " } else { "|-- " }
            Write-Host "$Prefix$branch$($item.Name)"

            if ($item.PSIsContainer) {
                $newPrefix = if ($isLast) { "$Prefix    " } else { "$Prefix|   " }
                Get-Tree $item.FullName $newPrefix
            }
        }
    }

    Write-Host $Path
    Get-Tree (Resolve-Path $Path)
}

Show-Tree

# Example usage: .\tree.ps1