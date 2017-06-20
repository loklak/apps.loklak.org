This is the loklak java api.
One Library to find them, One Library to bring them all.

## What is loklak?
Please see http://loklak.org

## Where is this library used? What can I do with it?
This library provides data structures and access methods for https://github.com/loklak/loklak_server and https://github.com/loklak/loklak_wok_android . You can use it if you want to access the loklak api.

## Dependencies
It depends on joda and json libraries which are included in android by default.
If you want to use this library in an android project, you therefore have zero dependencies.
If you want to use this library in any other java project, just include the jar files in the lib folder.

## How to build the library
Project supports both ```ant``` and ```maven``` for building.

### Ant
Just run ```ant```. The resulting jar file can be found int the ```dist``` folder.

### Maven
After successful build using ```maven```, jar file can be found in ```target``` folder. Building 
and testing using different IDEs:
* In eclipse:
    * Right click on *Project name* in package explorer > Run as > Maven Build ... > 
    Write ```clean package``` in *goals*. Use the created run configuration to generate the jar 
    file.
    * Right click on *Project name* > Run as > Maven Test
    
    
* In IntelliJ IDEA:
    * View > Tool Windows > Maven Projects > Lifecycle > ```package``` or ```clean```.
