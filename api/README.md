# OPTC-DB Api

The goal of this project is to migrate the old database structure to a more modular one.
With the new structure, there will be two main folder `api/raw/**` and `api/extracter/**`, the first one is intended for retriving the data and will be manually filled on second time.

## TODO

- [ ] Finish raw-db
  - [x] add pirateFest
  - [x] add flags/dropLocation
  - [x] add raw validation
  - [x] add write to disk
  - [x] Improve support by removing stats supporter description
  - [ ] add drop
  - [x] clean HMTL from all input field
  - [ ] check for the extracted flags
  - [ ] propagation of some flags
  - [ ] split family on unit for VS character
- [x] add images download
- [ ] add final-db generator
  - [ ] images downloader v2
  - [ ] add enhancer
    - [x] rumble literal descriptions
    - [x] rumble cost
    - [x] rumble filler (basedOn & family until specified)
    - [x] limit break sailor unlock lvl
    - [x] limit break captain
    - [x] limit break potentials literral
    - [ ] flags (legend)
    - [ ] versus combined description
    - [x] family ID generator
    - [x] evolution tree generator
    - [ ] images path generator
    - [ ] affiliated links generator
  - [ ] data validator
    - [ ] list all units with missing infos (incomplete flag)
    - [ ] missing potentials value
    - [ ] captain upgrade missing info or 'Not Translated'
  - [ ] add bulk editor placeholder
    - [ ] limit break required materials extracter?
  - [ ] add final json format
    - [ ] generic format
    - [ ] specific oriented (ie: rumble only, support only, calculator only, ...)
    - [ ] automate schema generation on script execution
- [x] Reorganize files
