function extractVariables(response) {
  const descriptionRegex = /Website description: (.+?)\n/;
  const summaryRegex = /Website summary: (.+)/;

  const descriptionMatch = response.match(descriptionRegex);
  const summaryMatch = response.match(summaryRegex);

  const websiteDescription = descriptionMatch ? descriptionMatch[1] : null;
  const websiteSummary = summaryMatch ? summaryMatch[1] : null;

  return {
    websiteDescription,
    websiteSummary,
  };
}


export default extractVariables;
// Usage example:
/* const response = `Website description: Ova web stranica ima čudan opis na glavnoj stranici.\n\nWebsite summary: OVDE SE MOŽE KORISTITI DOMEN ZA ILUSTRATIVNE PRIMERE, BEZ PRETHODNOG DOREĐIVANJA ILI DOZVOLE, I VIŠE INFORMACIJA MOŽETE PRONAĆI NA STRANICI.`;

const { websiteDescription, websiteSummary } = extractVariables(response);

console.log('Website Description:', websiteDescription);
console.log('Website Summary:', websiteSummary); */
