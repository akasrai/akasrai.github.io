let wasEdited = false;

if (!select('slug').val()) select('slug').hide();

select('save-slug').hide();
select('reset-slug').hide();
select('slug-edit-field').hide();
select('title').on('keyup', function() {
  if (!wasEdited) {
    let title = select('title').val();
    setSlug(title);
  }
});

select('edit-slug').on('click', function() {
  select('slug').hide();
  select('save-slug').show();
  select('edit-slug').hide();
  select('reset-slug').show();
  select('slug-edit-field').show();
  editSlug();
});

select('save-slug').on('click', function() {
  select('slug').show();
  select('save-slug').hide();
  select('edit-slug').show();
  select('reset-slug').hide();
  select('slug-edit-field').hide();
  saveSlug();
});

select('reset-slug').on('click', function() {
  select('slug').hide();
  select('save-slug').hide();
  select('edit-slug').show();
  select('reset-slug').hide();
  select('slug-edit-field').hide();
  resetSlug();
});

function setSlug(title, count = 0) {
  let slug = stringToSlug(title + (count > 0 ? `-${count}` : ''));
  setSlugIfSlugUnique(slug, count);
}

function editSlug() {
  let existingSlug = select('slug').val();
  select('slug-edit-field').val(existingSlug);
}

function saveSlug() {
  wasEdited = true;
  let newTitle = select('slug-edit-field').val();
  setSlug(newTitle);
}

function resetSlug() {
  wasEdited = false;
  select('slug').val('');
}

function setSlugIfSlugUnique(slug, count) {
  if (slug) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const { isUnique } = JSON.parse(this.response);
        console.log(isUnique);

        if (isUnique) {
          select('slug').show();
          select('slug').val(slug);
          select('slug').css('width', select('slug').val().length + 1.5 + 'ch');
        } else {
          let title = wasEdited
            ? select('slug-edit-field').val()
            : select('title').val();
          setSlug(title, count + 1);
        }
      }
    };
    xmlhttp.open('GET', '/blog/is-unique/' + slug, true);
    xmlhttp.send();
  }
}

function stringToSlug(str) {
  str = str.replace(/^\s+|\s+$/g, ''); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  let from = 'àáãäâèéëêìíïîòóöôùúüûñç·/_,:;';
  let to = 'aaaaaeeeeiiiioooouuuunc------';

  for (let i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return str;
}
