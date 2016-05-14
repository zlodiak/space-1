<script type="text/template" id="spaceTpl">
  <div class="container main_container">
    <div class="row">
      <div class="col-xs-12" id="infoLineWrap"></div>
    </div>

    <div class="row">
      <div class="col-xs-9" id="fieldWrap"></div>
      <div class="col-xs-3" id="informerWrap"></div>
    </div>        
  </div>
</script>


<script type="text/template" id="informerTpl">
  <table class="informer_table" id="informerTable">
    <tr>
      <td>Счёт: </td>
      <td><%= score %></td>
    </tr>

    <tr>
      <td>Ракеты: </td>
      <td><%= rockets %></td>
    </tr>   

    <tr>
      <td>Жизнь: </td>
      <td><%= energy %></td>
    </tr>   

    <tr>
      <td>Скорость: </td>
      <td><%= speed %></td>
    </tr>             
  </table>
</script>


<script type="text/template" id="fieldTpl">
  <div class="field" id="field"></div>
</script>


