Add-Type -AssemblyName 'System.Drawing'

Try {
    # Load the original, and work out where to put it in the bigger one.
    $stockHeader = [System.Drawing.Bitmap]::FromFile('D:\hello\crawl\financial\hel.png')
    $stock = [System.Drawing.Bitmap]::FromFile('D:\hello\crawl\financial\hel2.png')
    [int32]$new_width = $stockHeader.Width * ($stock.Width / $stockHeader.Width)
    [int32]$new_height = $stockHeader.Height * ($stock.Width / $stockHeader.Width)
    # Create empty canvas for the new image
    $resized_stock_header = New-Object System.Drawing.Bitmap($new_width, $new_height)
    # Draw new image on the empty canvas
    $graph = [System.Drawing.Graphics]::FromImage($resized_stock_header)
    $graph.DrawImage($stockHeader, 0, 0, $new_width, $new_height)

    # Blank canvas, get acces to draw on it, then make it white
    $result = [System.Drawing.Bitmap]::new($stock.Width, $resized_stock_header.Height + 336)
    $g = [System.drawing.graphics]::FromImage($result)
    $g.Clear([System.Drawing.Color]::White)
    # Put it there
    $g.DrawImage($resized_stock_header, 0, 0)
    $g.DrawImage($stock, 0, $resized_stock_header.Height)
    # Save it
    $result.Save('D:\hello\crawl\financial\stock.png', [System.Drawing.Imaging.ImageFormat]::Png)
}
catch {
    $_.Exception.Message | Out-File D:\hello\crawl\hello.txt
}