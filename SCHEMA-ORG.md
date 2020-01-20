# Schema.org best practices

WIP because this is complicated and it's not very useful use of my time.

Some things left to cover:
* `'@id'` property (sets the unique id for crawlers)
* image width, height property
* author sameAs list
* thumbnail
* dateModified to website
* image as list
* canonicalUrl for what??
* also what is site-name

## Always include WebPage (or other page) property

## The most important actions

So if you have looked at the schema.org action spec, you'll notice you could, in theory, add a million actions to your pages describing every possible action a user could take. Because that's a nightmare to implement and frankly, I haven't seen anybody who would have done it, you should focus on only on a small subset of potential actions.

### SearchAction

If you have a search implemented in your site with eg Algolia or ElasticSearch, a good practice would be to add a search action describing it to Google and other search engines, that you have searchable content. I don't know its SEO implications, but I see people doing it so it must do something, right?

### ViewAction

For this one user can see actual benefits. If you have Android app (haven't seen it for iOS apps), you can add ViewAction that prompts the user to view a page that has it in the Android app you have implemented it for. Great examples are news sites and other media, which have reader apps.


## Sources

* https://www.semrush.com/blog/schema-markup-for-company-corporations/