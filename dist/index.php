<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&amp;display=swap" rel="stylesheet">
    <title>Calibre reader</title>
    <?php include './favicon.incl.php' ?>
    <link rel="stylesheet" href="calibre-reader.css?_=0.11.1" type="text/css" media="all">
    <link rel="preload" href="calibre-reader-min.js?_=0.11.1" as="script">
    <meta name="robots" content="noindex, nofollow">
  </head>
  <body>
    <div class="container">
      <header>
        <div>
          <fieldset disabled class="search-form">
            <fieldset class="searchFields">
              <div class="input-group">
                <input type="search" class="search-input" placeholder="Cerca..." autofocus>
                <button type="button" class="btn search-btn">Cerca</button>
                <button type="button" class="btn reset-btn">Reset</button>
              </div>
            </fieldset>
            <fieldset class="search-options orderBy">
              <legend>Ordina per</legend>
              <div>
                <input type="radio" name="orderBy" id="orderBy-recent" value="recent" checked>
                <label class="btn orderBy-btn" for="orderBy-recent">Recenti</label>
                <input type="radio" name="orderBy" id="orderBy-serie" value="serie">
                <label class="btn orderBy-btn" for="orderBy-serie">Serie</label>
                <input type="radio" name="orderBy" id="orderBy-author" value="author">
                <label class="btn orderBy-btn" for="orderBy-author">Autore</label>
                <input type="radio" name="orderBy" id="orderBy-title" value="title">
                <label class="btn orderBy-btn" for="orderBy-title">Titolo</label>
                <input type="radio" name="orderBy" id="orderBy-year" value="year">
                <label class="btn orderBy-btn" for="orderBy-year" title="Anno prima edizione o pubblicazione">Anno</label>
              </div>
            </fieldset>

            <fieldset class="search-options filter">
              <legend>Filtra per</legend>
              <div>
                <input type="radio" name="filter" id="filter-authors" value="author">
                <label class="btn filter-btn" for="filter-authors">Autori</label>
                <input type="radio" name="filter" id="filter-tags" value="tag">
                <label class="btn filter-btn" for="filter-tags">Tags</label>
                <input type="radio" name="filter" id="filter-scaffale" value="scaffale">
                <label class="btn filter-btn" for="filter-scaffale">Scaffali</label>

              </div>
            </fieldset>
            <div class="search-info"></div>
          </fieldset>
        </div>
      </header>
      <main class="result-wrapper"></main>
      <div class="spinner-wrapper"><div class="spinner"></div></div>
    </div>
    <script src="calibre-reader-min.js?_=0.11.1"></script>
  </body>
</html>
