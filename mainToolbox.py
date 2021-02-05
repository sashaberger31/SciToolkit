class Letters:
    def __init__(self):
        print("Dummy greek letter initalization")
        self.mu = "mu"

greek = Letters()

# ----------- SI UNIT DEFINITIONS ---------------------------------------------#
SILength = {
'baseName': "meter",
'baseAbbrev': "m",
'scales': [10**-12, 10**-9, 10**-6, 10**-3, 10**-2, 10**-1, 1, 10, 10**2, 10**3, 10**6, 10**9],
"scaleNames": ["picometer", "nanometer", "micrometer", "milimeter", "centimeter", "decimeter", "meter", "decameter", "hectometer", "kilometer", "megameter", "gigameter"],
'scaleAbbrev': ["pm", "nm", greek.mu+"m", "mm", "cm", "dm", "m", "dam", "hm", "km", "Mm", "Gm"]
}

SITime = {
'baseName': "second",
'baseAbbrev': "s",
'scales': [10**-12, 10**-9, 10**-6, 10**-3, 10**-2, 10**-1, 1, 60, 3600, 86400, 31536000],
"scaleNames": ["picosecond", "nanosecond", "microsecond", "milisecond", "centisecond", "decisecond", "second", "minute", "hour", "day", "year"],
'scaleAbbrev': ["ps", "ns", greek.mu+"s", "ms", "cs", "ds", "s", "min", "h", "d", "yr"]
}

SIAmount = {
'baseName': "mole",
'baseAbbrev': "mol",
'scales': [10**-12, 10**-9, 10**-6, 10**-3, 10**-2, 10**-1, 1, 10, 10**2, 10**3, 10**6, 10**9],
"scaleNames": ["picomole", "nanomole", "micromole", "milimole", "centimole", "decimole", "mole", "decamole", "hectomole", "kilomole", "megamole", "gigamole"],
'scaleAbbrev': ["pmol", "nmol", greek.mu+"mol", "mmol", "cmol", "dmol", "mol", "damol", "hmol", "kmol", "Mmol", "Gmol"]
}

SICurrent = {
'baseName': "ampere",
'baseAbbrev': "A",
'scales': [10**-12, 10**-9, 10**-6, 10**-3, 10**-2, 10**-1, 1, 10, 10**2, 10**3, 10**6, 10**9],
"scaleNames": ["picoampere", "nanoampere", "microampere", "miliampere", "centiampere", "deciampere", "ampere", "decaampere", "hectoampere", "kiloampere", "megaampere", "gigaampere"],
'scaleAbbrev': ["pA", "nA", greek.mu+"A", "mA", "cA", "dA", "A", "daA", "hA", "kA", "MA", "GA"]
}

SITemp = {
'baseName': "kelvin",
'baseAbbrev': "K",
'scales': [10**-12, 10**-9, 10**-6, 10**-3, 10**-2, 10**-1, 1, 10, 10**2, 10**3, 10**6, 10**9],
"scaleNames": ["picokelvin", "nanokelvin", "microkelvin", "milikelvin", "centikelvin", "decikelvin", "kelvin", "decakelvin", "hectokelvin", "kilokelvin", "megakelvin", "gigakelvin"],
'scaleAbbrev': ["pK", "nK", greek.mu+"A", "mA", "cA", "dA", "A", "daA", "hA", "kA", "MA", "GA"]
}

SILumIntensity = {
'baseName': "candela",
'baseAbbrev': "cd",
'scales': [10**-12, 10**-9, 10**-6, 10**-3, 10**-2, 10**-1, 1, 10, 10**2, 10**3, 10**6, 10**9],
"scaleNames": ["picocandela", "nanocandela", "microcandela", "milicandela", "centicandela", "decicandela", "candela", "decacandela", "hectocandela", "kilocandela", "megacandela", "gigacandela"],
'scaleAbbrev': ["pcd", "ncd", greek.mu+"cd", "mcd", "ccd", "dcd", "cd", "dacd", "hcd", "kcd", "Mcd", "Gcd"]
}

SIMass = {
'baseName': "kilogram",
'baseAbbrev': "kg",
'scales': [10**-12, 10**-9, 10**-6, 10**-3, 1, 10**3, 10**6, 10**9],
"scaleNames": ["nanogram", "microgram", "miligram", "gram", "kilogram", "megagram", "gigagram"],
'scaleAbbrev': ["pg", "ng", greek.mu+"g", "mg", "g", "kg", "Mg", "Gg"]
}

SIBaseUnits = {
'length': SILength,
'time': SITime,
'amount': SIAmount,
'current': SICurrent,
'temperature': SITemp,
'luminousIntensity': SILumIntensity,
'mass': SIMass
}



class Constants:
    def __init__(self, baseUnits, importDerived = dict({}), importAliases = dict({})):
        self.baseUnits = baseUnit   # Dict holding the base units and their data
        self.derivedUnits = importDerived  # Dict holding the derived units and their data
        self.aliases = importAliases    # Dict holding the aliases and their data
        self.abbrevToBase = dict({})    # Dict whose keys are abbreviations and values are the corresponding base unit
        for unitType, data in self.baseUnits.items():
            self.registerUnit(self, (unitType, data))

    def registerUnit(self, unitSet):
        unitType = unitSet[0]
        data = unitSet[1]
        if unitType in self.derivedUnits or unitType in self.baseUnits:   # Make sure there are no derived units that are already base units or have already been derived
            raise Exception("Unit Type Collision Exception")

        for i in range(data["scaleAbbrev"]): # Make sure there are no abbreviation collisions and register the abbreviations
            if data["scaleAbbrev"][i] in self.abbrevToBase:
                raise Exception("Abbreviation Collision Exception")
            else:
                self.abbrevToBase[data["scaleAbbrev"][i]] = (data["scales"][i], set({(data["baseAbbrev"],1)}))

    def registerAlias(self, data):
        # TODO Finish Test
        for i in range(data["scaleAbbrev"]): # Make sure there are no abbreviation collisions and register the abbreviations
            if data["scaleAbbrev"][i] in self.abbrevToBase:
                raise Exception("Abbreviation Collision Exception")
            else:
                self.abbrevToBase[data["scaleAbbrev"][i]] = (data["scales"][i], set({(data["baseAbbrev"], 1)}))

    def getBaseFromSignature (self, signature):
        baseConst = 1
        baseSig = set()
        for item in signature:
            baseConst = item[1]
            baseSig.self.abbrevToBase[item][0]

    def multSig(self, signature1, signature2):
        for item1 in signature1:
            for item2 in signature2:
    def convert (self, inputUnit, destinationSignature):

            for item in destinationSignature:
