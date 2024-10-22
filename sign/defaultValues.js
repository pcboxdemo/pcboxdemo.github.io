


var defaultValues = [
  {
    "field": "Company Name",
    "value": ["Acme Corp", "Global Solutions", "InnovateX", "Blue Horizon Tech", "Vertex Industries"]
  },
  {
    "field": "Phone Number",
    "value": ["123-456-7890", "555-987-6543", "202-555-1234", "800-555-5678", "646-555-0987"]
  },
  {
    "field": "Email Address",
    "value": ["contact@acmecorp.com", "info@globalsolutions.com", "support@innovatex.com", "admin@bluehorizon.com", "sales@vertexindustries.com"]
  },
  {
    "field": "Email",
    "value": ["pchristensen+email1@boxdemo.com", "pchristensen+email2@boxdemo.com", "pchristensen+email3@boxdemo.com", "pchristensen+email4@boxdemo.com", "pchristensen+email5@boxdemo.com"]
  },
  {
    "field": "Website URL",
    "value": ["www.acmecorp.com", "www.globalsolutions.com", "www.innovatex.com", "www.bluehorizon.com", "www.vertexindustries.com"]
  },
  {
    "field": "AddressUnitedKingdom",
    "value": [
      "123 High Street, London, SW1A 1AA",
      "456 Oxford Road, Manchester, M1 2AB",
      "789 King Street, Edinburgh, EH1 1YZ",
      "101 Queen Avenue, Birmingham, B1 2JP",
      "202 Park Lane, Liverpool, L1 1AA"
    ]
  },
  {
    "field": "AddressGermany",
  "value": [
    "123 Hauptstraße, Berlin",
    "456 Lindenstraße, Munich",
    "789 Berliner Allee, Düsseldorf",
    "101 Königstraße, Stuttgart",
    "202 Rheinstraße, Frankfurt"
  ]},
  {    "field": "AddressIreland",

    "value": [
      "123 Grafton Street, Dublin",
    "456 O'Connell Street, Limerick",
    "789 Patrick Street, Cork",
    "101 Eyre Square, Galway",
    "202 Main Street, Kilkenny"
  ]},
  {    "field": "AddressDenmark",
    "value":[
    "123 Strøget, Copenhagen",
    "456 Nørrebrogade, Aarhus",
    "789 H. C. Andersens Boulevard, Odense",
    "101 Kongensgade, Esbjerg",
    "202 Ny Munkegade, Aalborg"
  ]},
  {
     "field": "AddressFrance",
    "value": [
    "123 Avenue des Champs-Élysées, Paris",
    "456 Rue de la République, Lyon",
    "789 Boulevard de la Croisette, Cannes",
    "101 Rue Saint-Catherine, Bordeaux",
    "202 Place du Capitole, Toulouse"
  ]}
  ,
  {
    "field": "Contract Date",
    "value": ["2024-10-01", "2024-09-15", "2024-08-30", "2024-07-10", "2024-06-20"]
  },
  {
    "field": "Start Date",
    "value": ["2024-11-01", "2024-12-01", "2025-01-01", "2024-10-15", "2024-11-15"]
  },
  {
    "field": "End Date",
    "value": ["2025-11-01", "2025-12-01", "2026-01-01", "2025-10-15", "2025-11-15"]
  },
  {
    "field": "Client Name",
    "value": ["John Smith", "Emily Johnson", "Michael Brown", "Sophia Davis", "Daniel Martinez"]
  },
  {
    "field": "Client Address",
    "value": [
      "123 Main St, Springfield, IL 62701",
      "456 Elm St, Los Angeles, CA 90001",
      "789 Oak Ave, Miami, FL 33101",
      "101 Pine Rd, New York, NY 10001",
      "202 Cedar Blvd, Austin, TX 73301"
    ]
  },
  {
    "field": "Project Name",
    "value": ["Website Redesign", "App Development", "Data Center Build", "Marketing Campaign", "Cloud Migration"]
  },
  {
    "field": "Project Description",
    "value": [
      "Complete redesign of the company website to improve user experience.",
      "Development of a mobile application for e-commerce platform.",
      "Build-out of a secure, scalable data center for client operations.",
      "Launch of a targeted marketing campaign for a new product.",
      "Migration of IT infrastructure to a cloud-based environment."
    ]
  },
  {
    "field": "Total Contract Value",
    "value": ["$100,000", "$500,000", "$1,000,000", "$75,000", "$250,000"]
  },
  {
    "field": "Payment Terms",
    "value": ["Net 30 days", "Net 15 days", "50% upfront, 50% on completion", "Net 60 days", "Payment upon delivery"]
  },
  {
    "field": "Late Payment Penalty",
    "value": ["5% of the total contract value", "10% of the invoice amount", "2% per month", "Flat $100 fee", "1.5% of overdue balance"]
  },
  {
    "field": "Signature (Client)",
    "value": ["", "", "", "", ""]
  },
  {
    "field": "Signature (Contractor)",
    "value": ["", "", "", "", ""]
  },
  {
    "field": "Date Signed (Client)",
    "value": ["2024-10-01", "2024-09-30", "2024-08-15", "2024-07-25", "2024-06-18"]
  },
  {
    "field": "Date Signed (Contractor)",
    "value": ["2024-10-01", "2024-09-30", "2024-08-15", "2024-07-25", "2024-06-18"]
  },
  {
    "field": "Invoice Number",
    "value": ["INV-2024-001", "INV-2024-002", "INV-2024-003", "INV-2024-004", "INV-2024-005"]
  },
  {
    "field": "Purchase Order Number",
    "value": ["PO-2024-001", "PO-2024-002", "PO-2024-003", "PO-2024-004", "PO-2024-005"]
  },
  {
    "field": "Due Date",
    "value": ["2024-11-01", "2024-12-01", "2024-10-01", "2024-09-15", "2024-08-20"]
  },
  {
    "field": "Item Description",
    "value": ["Consulting Services", "Software Development", "Construction Services", "Design & Architecture", "Marketing Services"]
  },
  {
    "field": "Quantity",
    "value": ["10", "20", "50", "100", "200"]
  },
  {
    "field": "Unit Price",
    "value": ["$100", "$200", "$150", "$250", "$500"]
  },
  {
    "field": "Subtotal",
    "value": ["$1,000", "$4,000", "$7,500", "$15,000", "$50,000"]
  },
  {
    "field": "Tax Rate",
    "value": ["10%", "8%", "5%", "12%", "7%"]
  },
  {
    "field": "Total Amount Due",
    "value": ["$1,100", "$4,320", "$7,875", "$16,800", "$53,500"]
  },
  {
    "field": "Bank Account Number",
    "value": ["9876543210", "1234567890", "1122334455", "9988776655", "5566778899"]
  },
  {
    "field": "Bank Routing Number",
    "value": ["021000021", "111000025", "031000503", "121000248", "021200025"]
  },
  {
    "field": "Authorized Representative",
    "value": ["Sarah Thompson", "David Williams", "Jessica Lee", "James Carter", "Linda Walker"]
  },
  {
    "field": "Job Title (Authorized Representative)",
    "value": ["Chief Operating Officer", "CEO", "Director of Operations", "VP of Marketing", "Managing Director"]
  },
  {
    "field": "Termination Clause",
    "value": [
      "Either party may terminate with 30 days written notice.",
      "Termination with 60 days notice.",
      "Mutual agreement for early termination.",
      "Immediate termination for breach of contract.",
      "Termination with cause or 90 days written notice."
    ]
  },
  {
    "field": "Governing Law",
    "value": ["State of New York", "State of California", "State of Illinois", "State of Texas", "State of Florida"]
  },
  {
    "field": "Dispute Resolution",
    "value": ["Arbitration in New York", "Mediation in Los Angeles", "Litigation in Chicago", "Arbitration in Austin", "Negotiation in Miami"]
  },
  {
    "field": "Confidentiality Clause",
    "value": [
      "All information must be kept confidential.",
      "No disclosure of proprietary information.",
      "Confidentiality agreement for 2 years.",
      "Mutual confidentiality obligations.",
      "Confidentiality extends beyond contract termination."
    ]
  },
  {
    "field": "Force Majeure Clause",
    "value": [
      "Exempts from liability due to unforeseeable events.",
      "Not liable for acts of God or natural disasters.",
      "Suspension of obligations during force majeure events.",
      "Contract void in case of war or terrorism.",
      "Force majeure clause applies for 90 days."
    ]
  },
  {
    "field": "Non-Compete Clause",
    "value": [
      "Prohibits competition for 1 year after contract end.",
      "Non-compete for 6 months post-contract.",
      "Non-compete within a 50-mile radius.",
      "No competition within the industry for 2 years.",
      "Non-compete for 12 months nationwide."
    ]
  },
  {
    "field": "Non-Disclosure Agreement",
    "value": [
      "Binding for a period of 2 years.",
      "Non-disclosure for 1 year after contract termination.",
      "Permanent non-disclosure.",
      "Mutual NDA for both parties.",
      "NDA effective during and after the contract."
    ]
  },
  {
    "field": "Name",
    "value": ["Alice Johnson", "Mark Thompson", "Sophia Chen", "Liam Garcia", "Olivia Martinez"]
  },
  {
    "field": "First Name",
    "value": ["Alice", "Mark", "Sophia", "Liam", "Olivia"]
  },
  {
    "field": "Last Name",
    "value": ["Johnson", "Thompson", "Chen", "Garcia", "Martinez"]
  },
  {
    "field": "Email",
    "value": ["alice.johnson@boxdemo.com", "mark.thompson@boxdemo.com", "sophia.chen@boxdemo.com", "liam.garcia@boxdemo.com", "olivia.martinez@boxdemo.com"]
  },
  {
    "field": "Network",
    "value": ["AT&T", "Verizon", "T-Mobile", "Sprint", "Vodafone"]
  },
  {
    "field": "Phone Model",
    "value": ["iPhone 14", "Samsung Galaxy S23", "Google Pixel 8", "OnePlus 11", "Motorola Razr 2024"]
  },
  {
    "field": "Date of Birth",
    "value": ["1990-01-15", "1985-06-22", "1992-11-30", "1988-03-05", "1995-08-19"]
  },
  {
    "field": "Lease Start Date",
    "value": ["2024-10-01", "2024-11-01", "2024-12-01", "2025-01-01", "2025-02-01"]
  },
  {
    "field": "Lease End Date",
    "value": ["2025-10-01", "2025-11-01", "2025-12-01", "2026-01-01", "2026-02-01"]
  },
  {
    "field": "Monthly Rent",
    "value": ["$1,500", "$2,000", "$2,500", "$3,000", "$3,500"]
  },
  {
    "field": "Security Deposit",
    "value": ["$1,500", "$2,000", "$2,500", "$3,000", "$3,500"]
  },
  {
    "field": "Tenant Name",
    "value": ["David Thompson", "Emma Williams", "Noah Brown", "Ava Davis", "Liam Johnson"]
  },
  {
    "field": "Tenant Contact Information",
    "value": [
      "david.thompson@boxdemo.com",
      "emma.williams@boxdemo.com",
      "noah.brown@boxdemo.com",
      "ava.davis@boxdemo.com",
      "liam.johnson@boxdemo.com"
    ]
  },
  {
    "field": "Property Address",
    "value": [
      "789 Maple St, Seattle, WA 98101",
      "321 Birch St, Denver, CO 80201",
      "654 Spruce St, Boston, MA 02101",
      "432 Cedar St, Portland, OR 97201",
      "876 Willow St, Chicago, IL 60601"
    ]
  },
  {
    "field": "Utilities Included",
    "value": [
      "Water and Trash",
      "Gas and Electric",
      "Internet and Cable",
      "Water, Trash, and Internet",
      "All Utilities Included"
    ]
  },
  {
    "field": "Late Fee",
    "value": ["$50", "$75", "$100", "$150", "$200"]
  },
  {
    "field": "Pet Policy",
    "value": ["No Pets Allowed", "Pets Allowed with Deposit", "Small Pets Only", "Cats Allowed", "Dogs Allowed"]
  },
  {
    "field": "Maintenance Responsibilities",
    "value": [
      "Tenant responsible for minor repairs.",
      "Landlord responsible for all repairs.",
      "Split responsibilities between landlord and tenant.",
      "Tenant responsible for lawn maintenance.",
      "Landlord handles all utilities."
    ]
  },
  {
    "field": "Renovation Policy",
    "value": [
      "No renovations allowed without permission.",
      "Tenant can renovate with approval.",
      "Renovations allowed at tenant's expense.",
      "Renovations must comply with building codes.",
      "Renovation requests reviewed case by case."
    ]
  },
  {
    "field": "Right of Entry",
    "value": [
      "Landlord may enter with 24-hour notice.",
      "Emergency access without notice.",
      "Scheduled maintenance visits with notice.",
      "Tenant must provide reasonable access.",
      "Landlord can enter for inspections."
    ]
  },
  {
    "field": "Subletting Policy",
    "value": [
      "Subletting not permitted.",
      "Subletting allowed with landlord's approval.",
      "Subletting allowed after 6 months.",
      "Tenant must provide subtenant's info.",
      "Subletting must comply with lease terms."
    ]
  },
  {
    "field": "Insurance Requirement",
    "value": [
      "Tenant must have renter's insurance.",
      "Landlord responsible for property insurance.",
      "Insurance must cover liability.",
      "Insurance coverage must be provided annually.",
      "Proof of insurance required before move-in."
    ]
  },
  {
    "field": "Termination Notice Period",
    "value": ["30 days", "60 days", "90 days", "14 days", "1 month"]
  },
  {
    "field": "Default Notice Period",
    "value": ["5 days", "10 days", "15 days", "30 days", "60 days"]
  },
  {
    "field": "Lead Paint Disclosure",
    "value": [
      "Lead paint disclosure provided.",
      "No known lead paint hazards.",
      "Lead paint inspection required.",
      "Lead hazard pamphlet given to tenant.",
      "Tenant must acknowledge lead paint risks."
    ]
  },
  {
    "field": "Mold Disclosure",
    "value": [
      "Property has been inspected for mold.",
      "No known mold issues reported.",
      "Tenant must report mold immediately.",
      "Landlord responsible for mold remediation.",
      "Tenant must keep property mold-free."
    ]
  },
  {
    "field": "Governing Law for Lease",
    "value": [
      "State of New York",
      "State of California",
      "State of Illinois",
      "State of Texas",
      "State of Florida"
    ]
  },
  {
    "field": "Lead Tenant",
    "value": [
      "Emily Johnson",
      "Michael Brown",
      "Daniel Martinez",
      "Sophia Davis",
      "Olivia Taylor"
    ]
  },
  {
    "field": "Co-Tenant",
    "value": [
      "Mark Wilson",
      "Jessica Harris",
      "Kevin Lee",
      "Ava Clark",
      "Lucas Thompson"
    ]
  },
  {
    "field": "Guarantor Name",
    "value": [
      "John Johnson",
      "Mary Smith",
      "James Williams",
      "Patricia Brown",
      "Robert Davis"
    ]
  },
  {
    "field": "Guarantor Address",
    "value": [
      "123 Market St, Philadelphia, PA 19101",
      "456 Main St, Atlanta, GA 30301",
      "789 Oak St, Dallas, TX 75201",
      "321 Elm St, Miami, FL 33101",
      "654 Pine St, San Francisco, CA 94101"
    ]
  },
  {
    "field": "Guarantor Phone Number",
    "value": [
      "555-123-4567",
      "555-234-5678",
      "555-345-6789",
      "555-456-7890",
      "555-567-8901"
    ]
  },
  {
    "field": "Guarantor Email",
    "value": [
      "guarantor1@boxdemo.com",
      "guarantor2@boxdemo.com",
      "guarantor3@boxdemo.com",
      "guarantor4@boxdemo.com",
      "guarantor5@boxdemo.com"
    ]
  },
  {
    "field": "Inspection Date",
    "value": [
      "2024-09-15",
      "2024-09-20",
      "2024-09-25",
      "2024-09-30",
      "2024-10-05"
    ]
  },
  {
    "field": "Expiration Date",
    "value": [
      "2025-10-01",
      "2025-12-01",
      "2026-01-01",
      "2026-02-01",
      "2026-03-01"
    ]
  },
  {
    "field": "Change of Terms Notice Period",
    "value": [
      "30 days",
      "60 days",
      "90 days",
      "14 days",
      "1 month"
    ]
  },
  {
    "field": "Keys Provided",
    "value": [
      "1 key",
      "2 keys",
      "3 keys",
      "Remote access code",
      "Garage door opener"
    ]
  },
  {
    "field": "Property Condition Report",
    "value": [
      "Move-in condition report completed.",
      "No damages reported at move-in.",
      "Minor repairs needed.",
      "Property in excellent condition.",
      "Tenant responsible for documenting issues."
    ]
  },
  {
    "field": "Post Code",
    "value": ["90210", "10001", "33101", "60601", "94101"]
  },
  {
    "field": "Street Name",
    "value": ["Main St", "Elm St", "Pine Rd", "Maple Ave", "Oak Blvd"]
  },
  {
    "field": "City",
    "value": ["Los Angeles", "New York", "Miami", "Chicago", "San Francisco"]
  },
  {
    "field": "Provider",
    "value": ["Comcast", "Verizon", "AT&T", "T-Mobile", "Spectrum"]
  },
  {
    "field": "Hausnr",
    "value": ["12", "45", "78", "102", "56"]
  },
  {
    "field": "House Number",
    "value": ["34", "67", "89", "123", "9"]
  }
  ,
    {
      "field": "Firmenname",
      "value": ["Acme Corp", "Global Solutions", "InnovateX", "Blue Horizon Tech", "Vertex Industries"]
    },
    {
      "field": "Telefonnummer",
      "value": ["123-456-7890", "555-987-6543", "202-555-1234", "800-555-5678", "646-555-0987"]
    },
    {
      "field": "E-Mail-Adresse",
      "value": ["contact@acmecorp.com", "info@globalsolutions.com", "support@innovatex.com", "admin@bluehorizon.com", "sales@vertexindustries.com"]
    },
    {
      "field": "Website-URL",
      "value": ["www.acmecorp.com", "www.globalsolutions.com", "www.innovatex.com", "www.bluehorizon.com", "www.vertexindustries.com"]
    },
    {
      "field": "Adresse",
      "value": [
        "123 Hauptstr., Springfield, IL 62701",
        "456 Elmstr., Los Angeles, CA 90001",
        "789 Eichenweg, Miami, FL 33101",
        "101 Kieferweg, New York, NY 10001",
        "202 Zedernallee, Austin, TX 73301"
      ]
    },
    {
      "field": "Vertragsdatum",
      "value": ["2024-10-01", "2024-09-15", "2024-08-30", "2024-07-10", "2024-06-20"]
    },
    {
      "field": "Startdatum",
      "value": ["2024-11-01", "2024-12-01", "2025-01-01", "2024-10-15", "2024-11-15"]
    },
    {
      "field": "Enddatum",
      "value": ["2025-11-01", "2025-12-01", "2026-01-01", "2025-10-15", "2025-11-15"]
    },
    {
      "field": "Kundenname",
      "value": ["John Smith", "Emily Johnson", "Michael Brown", "Sophia Davis", "Daniel Martinez"]
    },
    {
      "field": "Kundenadresse",
      "value": [
        "123 Hauptstr., Springfield, IL 62701",
        "456 Elmstr., Los Angeles, CA 90001",
        "789 Eichenweg, Miami, FL 33101",
        "101 Kieferweg, New York, NY 10001",
        "202 Zedernallee, Austin, TX 73301"
      ]
    },
    {
      "field": "Projektname",
      "value": ["Website-Redesign", "App-Entwicklung", "Rechenzentrumsaufbau", "Marketingkampagne", "Cloud-Migration"]
    },
    {
      "field": "Projektbeschreibung",
      "value": [
        "Komplettes Redesign der Firmenwebsite zur Verbesserung der Benutzererfahrung.",
        "Entwicklung einer mobilen Anwendung für eine E-Commerce-Plattform.",
        "Aufbau eines sicheren, skalierbaren Rechenzentrums für den Betrieb des Kunden.",
        "Start einer zielgerichteten Marketingkampagne für ein neues Produkt.",
        "Migration der IT-Infrastruktur in eine cloudbasierte Umgebung."
      ]
    },
    {
      "field": "Gesamtvertragswert",
      "value": ["100.000 €", "500.000 €", "1.000.000 €", "75.000 €", "250.000 €"]
    },
    {
      "field": "Zahlungsbedingungen",
      "value": ["Netto 30 Tage", "Netto 15 Tage", "50% im Voraus, 50% bei Fertigstellung", "Netto 60 Tage", "Zahlung bei Lieferung"]
    },
    {
      "field": "Strafgebühr bei verspäteter Zahlung",
      "value": ["5% des Gesamtvertragswerts", "10% des Rechnungsbetrags", "2% pro Monat", "Pauschal 100 €", "1,5% des überfälligen Betrags"]
    },
    {
      "field": "Unterschrift (Kunde)",
      "value": ["", "", "", "", ""]
    },
    {
      "field": "Unterschrift (Auftragnehmer)",
      "value": ["", "", "", "", ""]
    },
    {
      "field": "Datum der Unterzeichnung (Kunde)",
      "value": ["2024-10-01", "2024-09-30", "2024-08-15", "2024-07-25", "2024-06-18"]
    },
    {
      "field": "Datum der Unterzeichnung (Auftragnehmer)",
      "value": ["2024-10-01", "2024-09-30", "2024-08-15", "2024-07-25", "2024-06-18"]
    },
    {
      "field": "Rechnungsnummer",
      "value": ["INV-2024-001", "INV-2024-002", "INV-2024-003", "INV-2024-004", "INV-2024-005"]
    },
    {
      "field": "Bestellnummer",
      "value": ["PO-2024-001", "PO-2024-002", "PO-2024-003", "PO-2024-004", "PO-2024-005"]
    },
    {
      "field": "Fälligkeitsdatum",
      "value": ["2024-11-01", "2024-12-01", "2024-10-01", "2024-09-15", "2024-08-20"]
    },
    {
      "field": "Artikelbeschreibung",
      "value": ["Beratungsdienste", "Softwareentwicklung", "Bauleistungen", "Design und Architektur", "Marketing-Dienstleistungen"]
    },
    {
      "field": "Menge",
      "value": ["10", "20", "50", "100", "200"]
    },
    {
      "field": "Einzelpreis",
      "value": ["100 €", "200 €", "150 €", "250 €", "500 €"]
    },
    {
      "field": "Zwischensumme",
      "value": ["1.000 €", "4.000 €", "7.500 €", "15.000 €", "50.000 €"]
    },
    {
      "field": "Steuersatz",
      "value": ["10%", "8%", "5%", "12%", "7%"]
    },
    {
      "field": "Gesamtbetrag fällig",
      "value": ["1.100 €", "4.320 €", "7.875 €", "16.800 €", "53.500 €"]
    },
    {
      "field": "Bankkontonummer",
      "value": ["9876543210", "1234567890", "1122334455", "9988776655", "5566778899"]
    },
    {
      "field": "Bankleitzahl",
      "value": ["021000021", "111000025", "031000503", "121000248", "021200025"]
    },
    {
      "field": "Autorisierter Vertreter",
      "value": ["Sarah Thompson", "David Williams", "Jessica Lee", "James Carter", "Linda Walker"]
    },
    {
      "field": "Stellenbezeichnung (autorisierter Vertreter)",
      "value": ["Betriebsleiter", "CEO", "Leiter der Betrieb", "Vizepräsident Marketing", "Geschäftsführer"]
    },
    {
      "field": "Kündigungsklausel",
      "value": [
        "Jede Partei kann mit einer Frist von 30 Tagen schriftlich kündigen.",
        "Kündigung mit einer Frist von 60 Tagen.",
        "Einvernehmliche Beendigung des Vertrags.",
        "Sofortige Kündigung bei Vertragsbruch.",
        "Kündigung aus wichtigem Grund oder mit 90 Tagen Frist."
      ]
    },
    {
      "field": "Anwendbares Recht",
      "value": ["Bundesstaat New York", "Bundesstaat Kalifornien", "Bundesstaat Illinois", "Bundesstaat Texas", "Bundesstaat Florida"]
    },
    {
      "field": "Streitbeilegung",
      "value": ["Schiedsverfahren in New York", "Mediation in Los Angeles", "Gerichtsverfahren in Chicago", "Schiedsverfahren in Austin", "Verhandlung in Miami"]
    },
    {
      "field": "Vertraulichkeitsklausel",
      "value": [
        "Alle Informationen müssen vertraulich behandelt werden.",
        "Keine Weitergabe von geschützten Informationen.",
        "Vertraulichkeitsvereinbarung für 2 Jahre.",
        "Gegenseitige Vertraulichkeitspflichten.",
        "Vertraulichkeit gilt über die Vertragslaufzeit hinaus."
      ]
    },
    {
      "field": "Höhere-Gewalt-Klausel",
      "value": [
        "Haftungsbefreiung aufgrund unvorhersehbarer Ereignisse.",
        "Keine Haftung im Falle von Naturkatastrophen.",
        "Force-Majeure-Klausel bei Ereignissen außerhalb der Kontrolle.",
        "Vertragsaussetzung bei unvorhergesehenen Umständen.",
        "Haftungsfreistellung bei Streik, Krieg oder höherer Gewalt."
      ]
    }
    ,

  {
    "field": "Nome dell'azienda",
    "value": ["Acme Corp", "Global Solutions", "InnovateX", "Blue Horizon Tech", "Vertex Industries"]
  },
  {
    "field": "Numero di telefono",
    "value": ["123-456-7890", "555-987-6543", "202-555-1234", "800-555-5678", "646-555-0987"]
  },
  {
    "field": "Indirizzo e-mail",
    "value": ["contact@acmecorp.com", "info@globalsolutions.com", "support@innovatex.com", "admin@bluehorizon.com", "sales@vertexindustries.com"]
  },
  {
    "field": "URL del sito web",
    "value": ["www.acmecorp.com", "www.globalsolutions.com", "www.innovatex.com", "www.bluehorizon.com", "www.vertexindustries.com"]
  },
  {
    "field": "Indirizzo",
    "value": [
      "123 Via Principale, Springfield, IL 62701",
      "456 Via degli Olmi, Los Angeles, CA 90001",
      "789 Via delle Querce, Miami, FL 33101",
      "101 Via dei Pini, New York, NY 10001",
      "202 Viale dei Cedri, Austin, TX 73301"
    ]
  },
  {
    "field": "Data del contratto",
    "value": ["2024-10-01", "2024-09-15", "2024-08-30", "2024-07-10", "2024-06-20"]
  },
  {
    "field": "Data di inizio",
    "value": ["2024-11-01", "2024-12-01", "2025-01-01", "2024-10-15", "2024-11-15"]
  },
  {
    "field": "Data di fine",
    "value": ["2025-11-01", "2025-12-01", "2026-01-01", "2025-10-15", "2025-11-15"]
  },
  {
    "field": "Nome del cliente",
    "value": ["John Smith", "Emily Johnson", "Michael Brown", "Sophia Davis", "Daniel Martinez"]
  },
  {
    "field": "Indirizzo del cliente",
    "value": [
      "123 Via Principale, Springfield, IL 62701",
      "456 Via degli Olmi, Los Angeles, CA 90001",
      "789 Via delle Querce, Miami, FL 33101",
      "101 Via dei Pini, New York, NY 10001",
      "202 Viale dei Cedri, Austin, TX 73301"
    ]
  },
  {
    "field": "Nome del progetto",
    "value": ["Restyling sito web", "Sviluppo app", "Costruzione data center", "Campagna di marketing", "Migrazione cloud"]
  },
  {
    "field": "Descrizione del progetto",
    "value": [
      "Restyling completo del sito web aziendale per migliorare l'esperienza utente.",
      "Sviluppo di un'app mobile per una piattaforma e-commerce.",
      "Costruzione di un data center sicuro e scalabile per il funzionamento del cliente.",
      "Lancio di una campagna di marketing mirata per un nuovo prodotto.",
      "Migrazione dell'infrastruttura IT verso un ambiente cloud."
    ]
  },
  {
    "field": "Valore totale del contratto",
    "value": ["100.000 €", "500.000 €", "1.000.000 €", "75.000 €", "250.000 €"]
  },
  {
    "field": "Termini di pagamento",
    "value": ["Netto 30 giorni", "Netto 15 giorni", "50% in anticipo, 50% alla consegna", "Netto 60 giorni", "Pagamento alla consegna"]
  },
  {
    "field": "Penale per ritardo di pagamento",
    "value": ["5% del valore totale del contratto", "10% dell'importo della fattura", "2% al mese", "Tariffa fissa di 100 €", "1,5% dell'importo in arretrato"]
  },
  {
    "field": "Firma (cliente)",
    "value": ["", "", "", "", ""]
  },
  {
    "field": "Firma (fornitore)",
    "value": ["", "", "", "", ""]
  },
  {
    "field": "Data di firma (cliente)",
    "value": ["2024-10-01", "2024-09-30", "2024-08-15", "2024-07-25", "2024-06-18"]
  },
  {
    "field": "Data di firma (fornitore)",
    "value": ["2024-10-01", "2024-09-30", "2024-08-15", "2024-07-25", "2024-06-18"]
  },
  {
    "field": "Numero fattura",
    "value": ["INV-2024-001", "INV-2024-002", "INV-2024-003", "INV-2024-004", "INV-2024-005"]
  },
  {
    "field": "Numero d'ordine",
    "value": ["PO-2024-001", "PO-2024-002", "PO-2024-003", "PO-2024-004", "PO-2024-005"]
  },
  {
    "field": "Data di scadenza",
    "value": ["2024-11-01", "2024-12-01", "2024-10-01", "2024-09-15", "2024-08-20"]
  },
  {
    "field": "Descrizione dell'articolo",
    "value": ["Servizi di consulenza", "Sviluppo software", "Servizi di costruzione", "Design e architettura", "Servizi di marketing"]
  },
  {
    "field": "Quantità",
    "value": ["10", "20", "50", "100", "200"]
  },
  {
    "field": "Prezzo unitario",
    "value": ["100 €", "200 €", "150 €", "250 €", "500 €"]
  },
  {
    "field": "Totale parziale",
    "value": ["1.000 €", "4.000 €", "7.500 €", "15.000 €", "50.000 €"]
  },
  {
    "field": "Aliquota fiscale",
    "value": ["10%", "8%", "5%", "12%", "7%"]
  },
  {
    "field": "Totale dovuto",
    "value": ["1.100 €", "4.320 €", "7.875 €", "16.800 €", "53.500 €"]
  },
  {
    "field": "Numero di conto bancario",
    "value": ["9876543210", "1234567890", "1122334455", "9988776655", "5566778899"]
  },
  {
    "field": "Codice bancario",
    "value": ["021000021", "111000025", "031000503", "121000248", "021200025"]
  },
  {
    "field": "Rappresentante autorizzato",
    "value": ["Sarah Thompson", "David Williams", "Jessica Lee", "James Carter", "Linda Walker"]
  },
  {
    "field": "Titolo del rappresentante autorizzato",
    "value": ["Responsabile operativo", "CEO", "Direttore operativo", "Vicepresidente marketing", "Amministratore delegato"]
  },
  {
    "field": "Clausola di risoluzione",
    "value": [
      "Ciascuna parte può risolvere il contratto con un preavviso di 30 giorni.",
      "Risoluzione con preavviso di 60 giorni.",
      "Risoluzione consensuale del contratto.",
      "Risoluzione immediata in caso di violazione del contratto.",
      "Risoluzione per giusta causa o con preavviso di 90 giorni."
    ]
  },
  {
    "field": "Legge applicabile",
    "value": ["Stato di New York", "Stato della California", "Stato dell'Illinois", "Stato del Texas", "Stato della Florida"]
  },
  {
    "field": "Risoluzione delle controversie",
    "value": ["Arbitrato a New York", "Mediazione a Los Angeles", "Procedimento legale a Chicago", "Arbitrato ad Austin", "Negoziazione a Miami"]
  },
  {
    "field": "Clausola di riservatezza",
    "value": [
      "Tutte le informazioni devono essere trattate come riservate.",
      "Nessuna divulgazione di informazioni protette.",
      "Accordo di riservatezza valido per 2 anni.",
      "Obblighi di riservatezza reciproci.",
      "La riservatezza rimane valida dopo la scadenza del contratto."
    ]
  },
  {
    "field": "Clausola di forza maggiore",
    "value": [
      "Esclusione di responsabilità in caso di forza maggiore.",
      "Nessuna responsabilità per ritardi causati da eventi di forza maggiore.",
      "Sospensione del contratto in caso di catastrofi naturali.",
      "Clausola di forza maggiore per eventi fuori dal controllo.",
      "Sospensione del contratto in circostanze impreviste.",
      "Esclusione di responsabilità per sciopero, guerra o forza maggiore."
    ]
  }
,
  {
    "field": "La ragione Sociale del Cliente finale",
    "value": ["ABC Enterprises", "XYZ Global", "Delta Corp", "Sigma Innovations", "Omega Tech"]
  },
  {
    "field": "Indirizzo Legale del cliente Finale",
    "value": [
      "Via Legale 123, Roma, RM 00100",
      "Corso Italia 456, Milano, MI 20100",
      "Piazza Duomo 789, Firenze, FI 50100",
      "Via Verdi 101, Napoli, NA 80100",
      "Viale Mazzini 202, Torino, TO 10100"
    ]
  },
  {
    "field": "Operator",
    "value": ["John Doe", "Jane Smith", "Luca Rossi", "Maria Bianchi", "Davide Conti"]
  },
  {
    "field": "Current operator",
    "value": ["John Doe", "Jane Smith", "Luca Rossi", "Maria Bianchi", "Davide Conti"]
  },
  {
    "field": "V A T number",
    "value": ["IT12345678901", "IT98765432109", "IT11223344556", "IT99887766554", "IT55667788990"]
  },
  {
    "field": "VAT number",
    "value": ["IT12345678901", "IT98765432109", "IT11223344556", "IT99887766554", "IT55667788990"]
  }
,
  {
    "field": "Custom Email Subject",
    "value": ["Please Sign Your Contract", "Action Required: Document Signature Needed", "Contract Ready for Your Signature", "Sign Your Agreement Today", "Complete the Contract Signing Process"]
  },
  {
    "field": "Custom Email Message",
    "value": [
      "Dear Client, your contract is ready for signing. Please review and sign the document at your earliest convenience. Feel free to reach out if you have any questions.",
      "Hello, your agreement is awaiting your signature. Please access the document and complete the signing process. Let us know if you require any assistance.",
      "Greetings, your contract is prepared and needs your signature. Kindly review and sign it at your earliest convenience. Contact us if you have any queries.",
      "Dear Client, please sign the attached contract to complete the process. We look forward to finalizing the agreement with you. Reach out if you have any concerns.",
      "Hello, your document is ready for signature. Please review and sign it as soon as possible. We are available for any questions you may have."
    ]
  },
  {
    "field": "La ragione Sociale del Cliente finale",
    "value": [
      "Tech Innovators S.p.A.",
      "Global Logistics SRL",
      "Energia Verde S.r.l.",
      "Digital Solutions Italia",
      "Costruzioni Civili S.p.A."
    ]
  },
  {
    "field": "Nome e Cognome del Cliente Finale",
    "value": [
      "Giovanni Rossi",
      "Maria Bianchi",
      "Luca Ferrari",
      "Elena Conti",
      "Paolo Ricci"
    ]
  },
  {
    "field": "companyleave",
    "value": [
      "Soluzioni Ambientali S.p.A.",
      "Ingegneria Avanzata SRL",
      "Mercato Globale S.r.l.",
      "Innovazione Digitale SRL",
      "Costruzioni Industriali S.p.A."
    ]
  },
  {
    "field": "customername",
    "value": [
      "Francesca Rinaldi",
      "Alessandro Moretti",
      "Sofia Russo",
      "Marco Galli",
      "Valentina Greco"
    ]
  },
  {
    "field": "country",
    "value": [
        "Denmark",
        "Germany",
        "United Kingdom",
        "Belgium",
        "United States",
        "Canada",
        "Australia",
        "France",
        "Italy",
        "Spain",
        "Netherlands",
        "Sweden",
        "Norway",
        "Finland",
        "Switzerland",
        "Austria",
        "Ireland",
        "Portugal",
        "New Zealand",
        "Japan",
        "South Korea",
        "Singapore",
        "Brazil",
        "Mexico",
        "Argentina",
        "South Africa"
    ]
},
{"field":"parties",
"value": [
  "Party A: Company X",
  "Party B: Individual Y",
  "Party C: Government Z",
  "Party D: Non-Profit Organization W",
  "Party E: Partnership Group 1",
  "Party F: LLC ABC",
  "Party G: Corporation 123",
  "Party H: Sole Proprietor M",
  "Party I: Trust Fund T",
  "Party J: Consortium of Investors"
]},
  {
      "field": "title",
      "value": [
          "The Great Adventure",
          "Understanding AI",
          "Cooking Made Easy",
          "The Road to Success",
          "Secrets of the Universe",
          "Exploring the Unknown",
          "The Art of Gardening",
          "Mastering JavaScript",
          "Financial Freedom",
          "A Journey Through Time"
      ]
  },
  {
      "field": "author",
      "value": [
          "John Smith",
          "Emily Johnson",
          "Michael Brown",
          "Sarah Davis",
          "David Wilson",
          "Jennifer Garcia",
          "Robert Martinez",
          "Linda Rodriguez",
          "William Hernandez",
          "Jessica Lee"
      ]
  },
  {
      "field": "copyright",
      "value": [
          "© 2023 Global Publishing",
          "© 2023 Creative Works",
          "© 2023 Insight Press",
          "© 2023 Future Books",
          "© 2023 Knowledge House",
          "© 2023 Visionary Media",
          "© 2023 Innovative Publications",
          "© 2023 Green Leaf Publishing",
          "© 2023 Bright Ideas Press",
          "© 2023 Endless Horizons"
      ]
  },
  {
      "field": "topic",
      "value": [
          "Technology and Innovation",
          "Health and Wellness",
          "Personal Finance",
          "Travel and Adventure",
          "History and Culture",
          "Cooking and Cuisine",
          "Science and Nature",
          "Arts and Literature",
          "Education and Learning",
          "Sports and Recreation"
      ]
  },
  {
    "field": "randomstrings",
    "value": [
      "strategy", "synergy", "innovation", "growth", "optimization", "scalability", "leadership", 
      "vision", "execution", "efficiency", "branding", "profitability", "leverage", "collaboration", 
      "analytics", "disruption", "forecasting", "engagement", "networking", "ROI", "benchmarking", 
      "outsourcing", "market", "customer", "conversion", "targeting", "KPIs", "acquisition", 
      "development", "automation", "budgeting", "investment", "revenue", "milestone", "deliverable", 
      "turnover", "diversification", "compliance", "ecosystem", "partnership", "risk", "capital", 
      "venture", "valuation", "portfolio", "business", "startup", "monetization", "roadmap", 
      "transformation", "onboarding", "traction", "scaling", "branding", "globalization", 
      "operations", "blueprint", "ecosystem", "alignment", "value", "impact", "cost", 
      "strategy", "resources", "productivity", "differentiation", "negotiation", "infrastructure", 
      "logistics", "stakeholders", "pipeline", "outcome", "growth", "sustainability", "compliance", 
      "asset", "capitalization", "benchmark", "target", "performance", "governance", "restructuring", 
      "optimization", "risk", "innovation", "transparency", "execution", "equity", "leadership", 
      "branding", "customer-centric", "outsourcing", "franchise", "procurement", "merger", "acquisition", 
      "digitalization", "supply", "chain", "consulting", "diversification", "restructuring", "synergy", 
      "integration"
    ]
  }
  


]

  
function prefillDefaultValues(attrToUse) {
  var filled = [];
  let country;
  $('select').each(function() {
    if($(this).hasClass("nofill")) {
      //don't fill
    }
    else {
      var length = $(this).children('option').length;
      var index = Math.floor(Math.random() * length)+1;
      var id = $(this).attr('id');
      
      $('#' + id + ' option')[index].selected=true; // To select via index
      if(id=='country') {
        country =$("#country").find(":selected").val();
      }
    }
    
  });
  $('input').each(function(index,data) {
    if($(this).hasClass("nofill")) {
      //don't fill
    }
    else {
      //use
      var fl = $(this).attr(attrToUse);
      if(fl!=null) {
        fl = fl.trim(); 
      }
      var id = $(this).attr('id');
      if(id!=null) {
        id.trim();
      }

      if($(this).attr('type')=='text' && (fl!=null && id!=null)) {
        defaultValues.forEach(function(val) {
          if(!filled.includes(fl)) {
            if(fl=='address' && country!=null) {
              fl = fl + country
            }
            if(val.field.toLowerCase()==fl.toLocaleLowerCase() || val.field.toLowerCase().replace(/\s/g,'')==fl.toLocaleLowerCase().replace(/\s/g,'')) {
              filled.push(fl);
              $("#" + id).val(val.value[Math.floor(Math.random() * val.value.length)]);
            } else if(val.field.toLowerCase().includes(fl.toLocaleLowerCase()) || fl.toLowerCase().includes(val.field.toLocaleLowerCase())) {
              $("#" + id).val(val.value[Math.floor(Math.random() * val.value.length)]);
            }
          }
        })
      }
    }
  })
}
function getRandomValue(field) {
  defaultValues.forEach(function(val) {
    
    if(val.field.toLowerCase()==field.toLocaleLowerCase() || val.field.toLowerCase().replace(/\s/g,'')==field.toLocaleLowerCase().replace(/\s/g,'')) {
      $("#" + id).val(val.value[Math.floor(Math.random() * val.value.length)]);
    } else if(val.field.toLowerCase().includes(field.toLocaleLowerCase()) || field.toLowerCase().includes(val.field.toLocaleLowerCase())) {
      $("#" + id).val(val.value[Math.floor(Math.random() * val.value.length)]);
    }
    
  })
}