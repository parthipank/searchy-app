# searchy

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

## How to use Searchy
```
- Select your desired entity from the first dropdown. (Users, Organizations, Tickets)

- Searchable terms will get populated in the second search term dropdown. Select the searching term for the data you are looking for.

- Enter a precise search value for the search term in the search text box and hit enter to get your search results.
```

## How searchy works under the hood
```
- Based on the search entity you've selected (Users, Organizations, Tickets), searchy will also give you the other necessary entity values which are related.

- Examxple: Searching a particular user will give you his/her assignee ticket, submitter ticket and also the organization name.
```
