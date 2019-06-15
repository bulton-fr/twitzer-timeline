<ul>
    {foreach $listFiles as $fileKey => $fileInfo}
        <li><a href="/save/read/{$fileKey}">{$fileInfo.file} ({$fileInfo.nbTweet})</a></li>
    {/foreach}
</ul>
