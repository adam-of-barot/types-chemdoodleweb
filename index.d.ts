// Type definitions for ChemDoodle Web Components 10.0.0
// Project: https://web.chemdoodle.com
// Definitions by: Ádám Baróthi <https://github.com/adam-of-barot>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// Based off of the offical API docs: https://web.chemdoodle.com/docs/api

import type { mat4, vec3 } from "gl-matrix";

/**
 * this package is the root for all contents of the ChemDoodle Web Components library.
 * It contains access to all packages, canvases and layouts as well as shortcut functions for common tasks.
 */
declare module ChemDoodle {
    /** a hashmap for elemental data where the element's symbol is the key and the corresponding Element data structure is the value */
    const ELEMENT: Object

    /** a hashmap for residue data where the residue's symbol is the key and the corresponding Residue data structure is the value */
    const RESIDUE: Object

    /** a numbered Array containing all element symbols, where the index is the element's atomic number - 1 (index starts at 0 for hydrogen) */
    const SYMBOLS: Object

    /** returns the version of the ChemDoodle Web Components library; changing this value in source is not recommended */
    function getVersion(): string

    /** 
     * shortcut method to read a CIF file and return the corresponding Molecule and unit cell shape without instantiating a CIFInterpreter;
     * the returned object will contain two parameters, molecule and unitCell;
     * the three optional integers specify the supercell dimensions, by default they are all 1, so reading a file without specifying these parameters will produce just the unit cell.
     * In addition to reading atoms from CIF files, this interpreter will also produce a unit cell and other objects relevant to the display of periodic information
     */
    function readCIF(content: string, xSuper?: number, ySuper?: number, zSuper?: number): Object

    /** shortcut method to read CML and return the corresponding reaction data without instantiating an CMLInterpreter */
    function readCML(): Object

    /** 
     * shortcut method to read a IUPAC JCAMP-DX file and return the corresponding Spectrum without instantiating a JCAMPInterpreter;
     * this shortcut method will automatically convert HZ to PPM
     */
    function readJCAMP(content: string): structures.Spectrum

    /** 
     * shortcut method to read ChemDoodle JSON from a string and return an object with two parameters, molecules and shapes, without instantiating a JSONInterpreter;
     * this function will automatically handle the type of JSON object received
     */
    function readJSON(content: string): structures.Molecule

    /**
     * shortcut method to read a MDL MOLFile and return the corresponding Molecule without instantiating a MOLInterpreter;
     * this function supports both v2000 and v3000 MOLFiles;
     * the optional multiplier variable will override the default_anstromsPerBondLength variable, set it to 1 for 3D scenes in Ängstroms
     */
    function readMOL(content: string, multiplier?: number): structures.Molecule

    /**
     * shortcut method to read a RCSB PDB file and return the corresponding Molecule without instantiating a PDBInterpreter;
     * the optional multiplier variable will override the default_anstromsPerBondLength variable, set it to 1 for 3D scenes in Ängstroms.
     * In addition to reading atoms from PDB files, this interpreter will also read residue data and generate ribbons and cartoons for that data
     */
    function readPDB(content: string, multiplier?: number): structures.Molecule

    /**
     * shortcut method to read a MDL RXNFile and return the corresponding reaction data without instantiating an RXNInterpreter;
     * the optional multiplier variable will override the default_anstromsPerBondLength variable, set it to 1 for 3D scenes in Ängstroms
     */
    function readRXN(content: string, multiplier?: number): { molecules: structures.Molecule[]; shapes: structures.d3.Shape[] }

    /** shortcut method to read a XYZ file and return the corresponding Molecule without instantiating a XYZInterpreter */
    function readXYZ(content: string): structures.Molecule

    /** shortcut method to write an CML File given an input Molecule array without instantiating an CMLInterpreter */
    function writeCML(molecules: structures.Molecule[]): string

    /** shortcut method to write ChemDoodle JSON into a string given input Molecule and Shape arrays without instantiating a JSONInterpreter */
    function writeJSON(mols: structures.Molecule[], shapes: structures.d3.Shape[]): string
  
    /** shortcut method to write a V2000 MDL MOLFile given an input Molecule without instantiating a MOLInterpreter */
    function writeMOL(mol: structures.Molecule): string
  
    /** shortcut method to write a V3000 MDL MOLFile given an input Molecule without instantiating a MOLInterpreter */
    function writeMOLV3(mol: structures.Molecule): string

    /** shortcut method to write an MDL RXNFile given an input Molecule array and Shape array without instantiating an RXNInterpreter */
    function writeRXN(molecules: structures.Molecule[], shapes: structures.d3.Shape[]): string

    interface _Canvas {
        /**
         * additional function that is called after content is loaded into the Canvas;
         * is called in the loadMolecule and loadContent functions
         */
        afterLoadContent?(): void

        /**
         * set up some internal variables, usually for shapes before drawing in the uis interfaces;
         * force determines whether the check happens now or later
         */
        checksOnAction?(force: boolean): void

        /** draws extra graphics on top of the base graphics, override this for your custom canvases */
        drawChildExtras?(ctx: CanvasRenderingContext2D, styles?: structures.Styles): void

        /** additional function to be called during create(), such that child classes can do additional setup before returning to the child constructor */
        subCreate?(): void


        // Mobile Touch Events and Gestures

        /**
         * receives the double tap event for mobile devices, override this for your custom canvases,
         * forwards to dblclick if not implemented,
         * if neither dbltap or dblclick are implemented,
         * then the event is forwarded to touchstart or mousedown
         */
        dbltap?(e: JQuery.Event): void

        /** receives the gesture move event for mobile devices, override this for your custom canvases */
        gesturechange?(e: JQuery.Event): void

        /** receives the touch end event for mobile devices, override this for your custom canvases */
        gestureend?(e: JQuery.Event): void

        /** receives the gesture start event for mobile devices, override this for your custom canvases */
        gesturestart?(e: JQuery.Event): void

        /** 
         * receives an event for mobile devices where multiple fingers are moving on the screen, override this for your custom canvases,
         * the center of the fingers is provided in the Event, the number of fingers touching the screen is also sent to the handler
         */
        multitouchmove?(e: JQuery.Event, numFingers: number): void

        /** receives the tap event for mobile devices (quickly touchstart then touchend), override this for your custom canvases, forwards to click if not implemented */
        tap?(e: JQuery.Event): void

        /** receives the touch end event for mobile devices, override this for your custom canvases, forwards to mouseup if not implemented */
        touchend?(e: JQuery.Event): void

        /** receives the touch hold event for mobile devices, override this for your custom canvases; will fire if the user touches down and does not lift or move for 1 second */
        touchhold?(e: JQuery.Event): void

        /** receives the touch move event for mobile devices, override this for your custom canvases, forwards to drag if not implemented */
        touchmove?(e: JQuery.Event): void

        /** receives the touch start event for mobile devices, override this for your custom canvases, forwards to mousedown if not implemented */
        touchstart?(e: JQuery.Event): void


        // Mouse Events

        /** receives the mouse click event, override this for your custom canvases */
        click?(e: JQuery.Event): void

        /** receives the contextmenu event, responding to the right mouse button being pressed down to open the context menu */
        contextmenu?(e: JQuery.Event, delta: number): void

        /** receives the mouse double click event, override this for your custom canvases */
        dblclick?(e: JQuery.Event): void

        /** receives the mouse drag event, override this for your custom canvases */
        drag?(e: JQuery.Event): void

        /** receives the mouse middle click event, override this for your custom canvases */
        middleclick?(e: JQuery.Event): void

        /** receives the mouse middle mouse down event, override this for your custom canvases */
        middlemousedown?(e: JQuery.Event): void

        /** receives the mouse middle mouse up event, override this for your custom canvases */
        middlemouseup?(e: JQuery.Event): void

        /** receives the mouse down event, override this for your custom canvases */
        mousedown?(e: JQuery.Event): void

        /** receives the mouse move event, override this for your custom canvases */
        mousemove?(e: JQuery.Event): void

        /** receives the mouse out event, override this for your custom canvases */
        mouseout?(e: JQuery.Event): void

        /** receives the mouse over event, override this for your custom canvases */
        mouseover?(e: JQuery.Event): void

        /** receives the mouse up event, override this for your custom canvases */
        mouseup?(e: JQuery.Event): void

        /** receives the mouse wheel event, override this for your custom canvases; delta is the amount the wheel has spun */
        mousewheel?(e: JQuery.Event, delta: number): void

        /** receives the mouse right click event, override this for your custom canvases */
		rightclick?(e: JQuery.Event): void

        /** receives the mouse right mouse down event, override this for your custom canvases */
		rightmousedown?(e: JQuery.Event): void

        /** receives the mouse right mouse up event, override this for your custom canvases */
		rightmouseup?(e: JQuery.Event): void


        //Keyboard Events

        /** receives the key down event, override this for your custom canvases */
		keydown?(e: JQuery.Event): void

        /** receives the key press event, override this for your custom canvases */
		keypress?(e: JQuery.Event): void

        /** receives the key up event, override this for your custom canvases */
		keyup?(e: JQuery.Event): void
    }

    /**
     * is the parent class for all ChemDoodle Web Component Canvases, it should not be instantiated.
     * Its basic functionality allows for molecules to be drawn and loaded.
     * This class also hosts the system for handling user input events from the mouse and the keyboard.
     * This class should be extended for custom canvases.
     */
    abstract class _Canvas {
        constructor()

        /** the HTML id of the associated HTML element */
        id: string
        /** the width the associated HTML element */
        width: number
        /** the height of the associated HTML element */
        height: number
        /** the visual specifications that define how content should be painted */
        styles: structures.Styles
        /** an array of Molecule data structures that the Canvas renders */
        molecules: structures.Molecule[]
        /** an array of Shape data structures that the Canvas renders */
        shapes: structures.d3.Shape[]
        /** 
         * the message to be displayed if there is no content currently present for the canvas to render.
         * If this variable is undefined, no message is displayed if there is no content
         */
        emptyMessage: string
        /** 
         * the background image, overrides the VisualSpecification backgroundColor property;
         * if undefined, no image is drawn
         */
        image: ImageData
        /** 
         * all default browser event actions (like scrolling, text input) are blocked when performed above the Canvas,
         * set this variable to true to disable this, as is done when the sketcher needs text input
         */
        doEventDefault: boolean
        toolbarManager: uis.gui.desktop.ToolbarManager
    
        /**
         * loads the given Molecule, mol, and checks it;
         * the current content of the canvas is not cleared, the input mol is pushed as the next element of the molecules array;
         * repaints canvas
         */
        addMolecule(mol: structures.Molecule): void

        /**
         * loads the given Shape, shape; the current content of the canvas is not cleared, the input shape is pushed as the next element of the shapes array;
         * repaints canvas
         */
        addShape(shape: structures.d2._Shape): void

        /** returns true if a bond exists in one of the Canvas's molecules that contains the two parameter atoms */
        bondExists(a1: structures.Atom, a2: structures.Atom): boolean

        /** centers the loaded content in the canvas */
        center(): void

        /** 
         * clears the canvas by emptying the molecules and shapes arrays and then repaints;
         * resets the scale back to 1
         */
        clear(): void

        /** 
         * this function places the canvas in the HTML page and is called in every constructor of the children classes.
         * The id is the HTML id of the canvas element, with width and height its dimensions
         */
        create(id: string, width: number, height: number): void

        /** returns an Array containing all of the atoms of the molecules contained within the canvas */
        getAllAtoms(): structures.Atom[]

        /** returns an Array containing all of the bonds of the molecules contained within the canvas */
        getAllBonds(): structures.Bond[]

        /** returns an Array containing all of the Atoms of the molecules and Points of the shapes contained within the canvas */
        getAllPoints(): (structures.Atom | structures.Point)[]

        /**
         * returns the bond present in the Canvas's molecules that contains the two parameter atoms;
         * if such a bond does not exist, undefined is returned
         */
        getBond(a1: structures.Atom, a2: structures.Atom): structures.Bond | undefined

        /** returns a Bounds object containing the 2D bounds of all of the graphics in the Canvas */
        getContentBounds(): math.Bounds

        /** returns the first Molecule element in the molecules array currently associated with the canvas */
        getMolecule(): structures.Molecule

        /**
         * returns the Molecule in the Canvas's molecules array that contains the parameter atom;
         * if such a molecule does not exist, undefined is returned
         */
        getMoleculesByAtom(a: structures.Atom): structures.Molecule | undefined

        /** returns the Canvas's array of Molecule objects */
        getMolecules(): structures.Molecule[]

        /**
         * loads the given Molecules and Shapes in the provided mols and shapes Arrays;
         * the current content of the canvas is cleared, the input arrays become the new molecules and shapes Arrays;
         * checks molecules and repaints canvas
         */
        loadContent(mols: structures.Molecule[], shapes: structures.d3.Shape[]): void

        /**
         * loads the given Molecule, mol, and checks it;
         * the current content of the canvas is cleared, the input mol is placed as the first element of the molecules array;
         * repaints canvas
         */
        loadMolecule(mol: structures.Molecule): void
        
        /** conditions the user input event and sets a new variable in the Event object named p that contains the coordinates of the event in the canvas */
        prehandleEvent(e: JQuery.Event): void

        /**
         * removes the given Molecule, mol from the molecules array;
         * repaints canvas
         */
        removeMolecule(mol: structures.Molecule): void

        /**
         * removes the given Shape, shape from the shapes array;
         * repaints canvas
         */
        removeShape(shape: structures.d2._Shape): void

        /** repaints the canvas */
        repaint(): void

        /**
         * resizes the canvas to the input width and height parameters, this is done efficiently and is the prefered way to resize Canvas objects;
         * this function will automatically recenter content and perform the necessary functions to update rendering
         */
        resize(width: number, height: number): void

        /** sets the background image to the image specified by the url parameter */
        setBackgroundImage(): void
    }

    /** is a child of the Canvas class and provides a basic canvas for simply displaying a static styled structural drawing */
    class ViewerCanvas extends _Canvas {
        constructor(id: string, width: number, height: number)
    }

    /** is a child of the Canvas class and provides a basic button-like canvas: it responds to mouse overs and executes a link or action when clicked on */
    class HyperlinkCanvas extends _Canvas {
        constructor(id: string, width: number, height: number, urlOrFunction: string)

        /** this is the url to be directed to when clicked, this can also be a function object and the function will be executed when clicked */
        urlOrFuntion: string
        /** the color of the mouse over highlight */
        color: string
        /** the width of the mouse over highlight */
        size: number
        /** if true and urlOrFunction is a url, then the url will be opened in a new window instead of changing the current page */
        openInNewWindow: boolean
        /** if this is initialized, then the mouse over will display an image instead of a hyperlink-like decoration */
        hoverImage: ImageData
        /** keeps track of the last event */
        e: JQuery.Event

        /** sets the canvas's hover image to the image url specified */
        setHoverImage(url: string): void

        /** performs the mouse click action */
        click(e: JQuery.Event): void

        /** draws extra graphics on top of the base graphics */
        drawChildExtras(ctx: CanvasRenderingContext2D): void

        /**  performs the mouse out action */
        mouseout(e: JQuery.Event): void

        /** performs the mouse over action, currently not called */
        mouseover(e: JQuery.Event): void
    }

    /** is a child of the Canvas class and provides a basic canvas for users to transform (translate [alt+drag], rotate [drag], scale [mousewheel]) molecules with */
    class TransformCanvas extends _Canvas {
        constructor(id: string, width: number, height: number)

        /** keeps track of the last mouse position */
        lastPoint: structures.Point
        /** will rotate in 3 dimensions if true, will only rotate around the z axis if false */
        rotate3D: boolean
        /** multiplication modifier for the rotation calculations, larger numbers correspond to faster rotations */
        rotationMultMod: number
        /** keeps track of the last pinch scale from a mobile gesture */
        lastPinchScale: number
        /** keeps track of the last rotation magnitude from a mobile gesture */
        lastGestureRotate: number
        
        /** performs the double-click action, which centers the molecule */
		dblclick(e: JQuery.Event): void

        /** performs the mouse drag action */
		drag(e: JQuery.Event): void

        /** handles any pinch and rotate gestures from mobile devices which will scale and rotate the molecule */
		gesturechange(e: JQuery.Event): void

        /** resets the gesture tracking variables and ends the gesture */
		gestureend(e: JQuery.Event): void

        /** performs the mouse down action */
		mousedown(e: JQuery.Event): void

        /** performs the mouse wheel action */
        mousewheel(e: JQuery.Event, delta: number): void;
    }

    /** is a child of the Canvas class and provides a basic canvas for users to search databases with. */
    class MolGrabberCanvas extends _Canvas {
        constructor(id: string, width: number, height: number)

        /** generates the HTML for the database drop down and submit buttons */
		getInputFields?(): void

        /** uses iChemLabs cloud services to contact the database with query term as defined in the form and then updates the Canvas after receiving the molecule data */
		search?(): void

        /** automatically searches for and loads the input search term */
		setSearchTerm?(term: string): void
    }

    /**
     * is a child of the Canvas class and provides a basic canvas for users to load molecule from their computer with.
     * The action is the server side script to be called that loads the file into a hidden frame.
     * After the asynchronous call is finished, the correct function is called to load the molecule into the canvas with the associated id
     */
    class FileCanvas extends _Canvas {
        constructor(id: string, width: number, height: number, string: string, urlOrFunction: string, color: string, size: string)
    }

    /**
     * is a child of the Canvas class and is the parent class for all animated ChemDoodle Web Component Canvases, it should not be instantiated.
     * It provides an extendable framework for creating animations.
     * This class should be extended for custom animated canvases.
     */
    abstract class _AnimatorCanvas extends _Canvas {
        constructor()

        /** a handle on the current Timer so it can be started and stopped */
		handle: TimerHandler
        /** the default refresh rate */
		timeout: number
        /** keeps track of the last time the nextFrame() function was called */
		lastTime: number

        /** returns true if the animation is currently running */
		isRunning(): boolean

        /** initializes the animation */
		startAnimation(): void

        /** terminates the animation */
		stopAnimation(): void

        /**
         * called by the timer, in the frequency specified by the interval timeout,
         * this must be overridden for your custom canvases, repaints the canvas after each call;
         * this class keeps track of the time between calls and passes that value to this function for accurate animations
         */
        abstract nextFrame(delta: number): void
    }

    /** is a child of the AnimatorCanvas class and provides a basic canvas for displaying molecular rotation animations */
    class RotatorCanvas extends _AnimatorCanvas {
        constructor(id: string, width: number, height: number, string: string, rotate3D: boolean)

        /** the animation will rotate in 3 dimensions if true, will only rotate around the z axis if false */
        rotate3D: boolean
        /** the x rotation increment */
        xIncrement: number
        /** the y rotation increment */
        yIncrement: number
        /** the z rotation increment */
        zIncrement: number

        /** catches double click events and toggles the animation */
        dblclick(e: JQuery.Event): void

        /** updates the state during the rotation animation */
        nextFrame(delta: number): void
    }

    /** is a child of the AnimatorCanvas class and provides a basic canvas for displaying transitions between several molecular structures */
    class SlideshowCanvas extends _AnimatorCanvas {
        constructor(id: string, width: number, height: number)

        /** the molecular structures to be displayed in the order they are to be displayed in, this should not be empty */
		molecules: structures.Molecule[]
        /** keeps track of the current index in molecules */
		curIndex: number
        /** this parameter is inherited from AnimatorCanvas, but it is set to a larger value */
		timeout: number
        /** keeps track of the current alpha during the transition */
		alpha: number
        /** holds on to the second inner Timer for performing the transition, so it can be started and stopped */
		innerHandle: TimerHandler
        /** keeps track of the current phase (different types of animations) during the transition */
		phase: number

        /** adds a molecule to the slideshow */
		addMolecule(molecule: structures.Molecule): void

        /** completes the second phase of the animation and the molecule switch */
		breakInnerHandle(): void

        /** draws extra graphics on top of the base graphics */
        drawChildExtras(ctx: CanvasRenderingContext2D): void

        /** updates the state during the rotation */
        nextFrame(delta: number): void;
    }

    /**
     * is the parent class for all 3D ChemDoodle Web Component Canvases, it should not be instantiated.
     * Its basic functionality allows for molecules to be rendered in a 3D scene and loaded.
     * This class should be extended for custom 3D canvases.
     */
    abstract class _Canvas3D extends _Canvas {
        constructor()

        /**
         * by default, the webgl context will not preserve the drawing buffer, leading to performance improvements;
         * however you may wish to set this to true to preserve the buffer if you wish to use the ChemDoodle.io.png class to output the Canvas3D to PNG;
         * once a Canvas3D is created, the context will have this value bound and the context cannot be changed after initialization (you will need to create a new Canvas3D with the different value)
         */
        static PRESERVE_DRAWING_BUFFER: string
        /** the rotation matrix to be applied before rendering the 3D scene */
        rotationMatrix: mat4
        /** the translation (actually the negative of the center of the scene content) to be applied before rendering the 3D scene */
        contentCenter: Array<number>
		/** the last point in the canvas's space that the user initiated a mouseDown event */
		lastPoint: structures.Point
		/** overridden to 'WebGL is Unavailable!', to be displayed by default if the WebGL context creation fails */
		emptyMessage: string
		/** keeps track of the pinch scale for mobile gestures */
		lastPinchScale: number
		/** keeps track of the gesture rotate value for mobile gestures */
		lastGestureRotate: number

        /** pipeline for deferred rendering */
		deferredRender(): void

        /** controls what the Canvas3D displays if WebGL is unavailable */
		displayMessage(): void

        /** pipeline for immediate rendering */
		forwardRender(): void

        /** returns true if the 3D context is capable of supporting deferred rendering */
		isSupportDeferred(): boolean

        /**
         * returns the atom or bond that is located in the 3D scene, closest to the camera, at the <canvas> coordinates of the input x and y values;
         * if no object is at those coordinates, undefined is returned;
         * includeAtoms and includeBonds define whether those objects are selectable
         * (if you make both true and you are only looking to select atoms,bonds will get in the way of selecting atoms)
         */
        pick(x: number, y: number, includeAtoms: boolean, includeBonds: boolean): structures.Atom | structures.Bond | undefined

        /** deferred rendering color pass */
		renderColor(): void

        /** renders the scene to the shadow FBO */
		renderDepthMap(): void

        /** helper method for rendering decorative components of the scene */
		renderExtras(): void

        /** deferred rendering normal pass */
		renderNormal(): void

        /** deferred rendering Outline pass */
		renderOutline(): void

        /** deferred rendering position pass */
		renderPosition(): void

        /** deferred rendering SSAO pass */
		renderSSAO(): void

        /** helper method for rendering text */
        renderText(text: string, position: Array<number>): void

        /** creates the 3D scene */
		setupScene(): void

        /** updates the projection for the scene without other overhead */
		updateScene(): void

        /** helper method to reset the scene if a gl parameter has been altered */
		afterLoadContent(): void

        /** centers the molecule in 3D around the origin */
		center(): void

        /** performs the mouse drag action */
		drag(e: JQuery.Event): void

        /** performs the gesturechange action */
		gesturechange(e: JQuery.Event): void

        /** performs the mouse down action */
		mousedown(e: JQuery.Event): void

        /** performs the mouse up action */
		mousedown(e: JQuery.Event): void

        /** performs the mouse scroll action */
		mousewheel(e: JQuery.Event): void

        /** performs the multitouchmove action */
		multitouchmove(e: JQuery.Event): void

        /** renders the 3D scene */
		repaint(): void

        /** performs the mouse right click action */
		rightmousedown(e: JQuery.Event): void

        /**
         * sets up GLContext, alerts viewer to warning if GLContext cannot be created;
         * initializes shaders and scene
         */
        subCreate(): void
    }

    /** is a child of the Canvas3D class and provides a basic canvas for simply displaying a static 3D scene of a molecule */
    class ViewerCanvas3D extends _Canvas3D {
        constructor(id: string, width: number, height: number)

        /** set to undefined to ignore this gesture */
		drag(): void

        /** set to undefined to ignore this gesture */
		mousedown(): void

        /** set to undefined to ignore this gesture */
		mousewheel(): void

        /** set to undefined to ignore this gesture */
		rightmousedown(): void
    }

    /** is a child of the Canvas3D class and provides a basic canvas for users to transform (translate [alt+drag], rotate [drag], scale [mousewheel]) molecules with in a 3D scene */
    class TransformCanvas3D extends _Canvas3D {
        constructor(id: string, width: number, height: number)
    }

    /**
     * is a child of the Canvas3D class and provides a basic 3D canvas for users to search databases with.
     * The content may then be transformed just as in the Transformer3D canvas.
     */
    class MolGrabberCanvas3D extends _Canvas3D {
        constructor(id: string, width: number, height: number)

       /** uses iChemLabs cloud services to contact the database with query term as defined in the form and then updates the Canvas3D after receiving the molecule data */
		search(): void

       /** automatically searches for and loads the input search term */
		setSearchTerm(term: string): void
    }

    /** is a child of the Canvas3D class and provides a basic canvas for displaying molecular rotation animations in a 3D scene, also doubly inherits methods from the AnimatorCanvas class */
    class RotatorCanvas3D extends _Canvas3D {
        constructor(id: string, width: number, height: number)

        /** a handle on the current Timer so it can be started and stopped */
        handle: TimerHandler
        /** the default refresh rate */
        timeout: number
        /** the x rotation increment */
        xIncrement: number
        /** the y rotation increment */
        yIncrement: number
        /** the z rotation increment */
        zIncrement: number

       /** returns true if the animation is currently running */
		isRunning(): boolean

       /** initializes the animation */
		startAnimation(): void

       /** terminates the animation */
		stopAnimation(): void

        /** catches double click events and toggles the animation */
		dblclick(e: JQuery.Event): void

        /** set to undefined to ignore this gesture */
		drag(): void

        /** set to undefined to ignore this gesture */
		mousedown(): void

        /** set to undefined to ignore this gesture */
		mousewheel(): void

        /** updates the state during the rotation animation */
		nextFrame(delta: number): void

        /** set to undefined to ignore this gesture */
		rightmousedown(): void
    }

    /** is a child of the Canvas3D class and provides a basic canvas for displaying movies of molecules in a 3D scene, also doubly inherits methods from the AnimatorCanvas class */
    class MovieCanvas3D extends _Canvas3D {
        constructor(id: string, width: number, height: number)

        /** specifies that movie will play once to the end and stop */
        static PLAY_ONCE: number
        /** specifies that movie will play continuously, restarting from the first frame once it reaches the end */
        static PLAY_LOOP: number
        /** specifies that movie will play continuously, springing back and forth between the first and last frames */
        static PLAY_SPRING: number
        /**
         * an array containing molecules and shapes, with each entry representing a frame to be displayed in the order they are to be displayed in, this should not be empty;
         * you should fill this array before the _Canvas.loadMolecule() function is called so all the data is properly setup
         */
        frames: (structures.Molecule | structures.d3.Shape)[]
        /** a handle on the current Timer so it can be started and stopped */
        handle: TimerHandler
        /** the default refresh rate */
        timeout: number
        /** set to specify how the movie playback will proceed */
        playMode: number
        /** used internally to allow the spring playback method to function */
        reverse: boolean
        /** keeps track of the next frame number */
        frameNumber: number

        /** takes an array of molecules and shapes and adds them to the end of the frame array. */
        addFrame(mols: structures.Molecule[], shapes: structures.d3.Shape[]): void

        /** returns true if the animation is currently running */
		isRunning(): boolean

        /** initializes the animation */
		startAnimation(): void

        /** terminates the animation */
		stopAnimation(): void

        /** centers all of the frames in the molecules array */
		center(): void

        /** catches double click events and toggles the animation */
		dblclick(e: JQuery.Event): void

        /** updates the state during the rotation animation */
		nextFrame(delta: number): void
    }

    /**
     * is a child of the Canvas class and is the parent class for all Spectrum ChemDoodle Web Component Canvases, it should not be instantiated.
     * This canvas is specifically suited for displaying graphics of spectra.
     */
    abstract class _SpectrumCanvas extends _Canvas {
        constructor()

        /** the Spectrum data structure that this Canvas displays */
        spectrum: structures.Spectrum

        /** returns the Spectrum belonging to this SpectrumCanvas */
        getSpectrum(): structures.Spectrum

        /** loads the spectrum and then repaints */
		loadSpectrum(): void
        
        /** paints the spectrum */
		repaint(): void
    }

    /** is a child of the SpectrumCanvas class and provides a basic canvas for simply displaying a static styled spectrum drawing */
    class ObserverCanvas extends _SpectrumCanvas {
        constructor(id: string, width: number, height: number)
    }

    /** is a child of the SpectrumCanvas class and provides an basic canvas for viewing several spectra superimposed over each other */
    class OverlayCanvas extends _SpectrumCanvas {
        constructor(id: string, width: number, height: number)

        /** the additional spectra to be overlaid on the main spectrum */
        overlaySpectra: structures.Spectrum[]

        /**
         * adds a spectrum to the canvas;
         * it is recommended that this function is used over directly populating the overlaySpectra array, as this function will first set the main spectrum if it isn't set
         */
		addSpectrum(spectrum: structures.Spectrum): void

        /** draws extra graphics on top of the base graphics */
		innerRepaint(ctx: CanvasRenderingContext2D): void
    }

    /** is a child of the SpectrumCanvas class and provides an interactive canvas for zooming in on peaks in spectra */
    class PerspectiveCanvas extends _SpectrumCanvas {
        constructor(id: string, width: number, height: number)

        /** keeps track of the x-coordinates for the start and end of the drag event */
        dragRange: structures.Point
        /** determines whether the y-axis will rescale upon a zoom */
        rescaleYAxisOnZoom: boolean
        /** keeps track of the last pinch scale from a mobile gesture */
        lastPinchScale: number

        /** performs the double-click action, which fits the entire spectrum to the canvas */
		dblclick(e: JQuery.Event): void

        /** performs the mouse drag action, which will zoom in on the spectrum; if the shift key is held, then the spectrum will be translated */
		drag(e: JQuery.Event): void

        /** draws extra graphics on top of the base graphics */
		drawChildExtras(ctx: CanvasRenderingContext2D): void

        /** handles any pinch gestures from mobile devices which will scale the spectrum */
		gesturechange(e: JQuery.Event): void

        /** performs the mouse down action */
		mousedown(e: JQuery.Event): void

        /** performs the mouse up action */
		mouseup(e: JQuery.Event): void

        /** performs the mouse wheel action */
        mousewheel(e: JQuery.Event, delta: number): void
    }

    /** is a child of the SpectrumCanvas class and provides an interactive canvas for viewing internal coordinates in spectra */
    class SeekerCanvas extends _SpectrumCanvas {
        constructor(id: string, width: number, height: number, seekType: string)

        /** seeks the pointer location */
        static SEEK_POINTER: string
        /** seeks closest plot coordinate by the x coordinate of the pointer location */
        static SEEK_PLOT: string
        /** seeks closest peak coordinate by the x coordinate of the pointer location */
        static SEEK_PEAK: string
        /** seek method for the canvas, must be one of the SEEK constants */
        seekType: string
        /** keeps track of the last point from the user */
        p: structures.Point

        /** draws extra graphics on top of the base graphics */
		innerRepaint(ctx: CanvasRenderingContext2D): void

        /** performs the mouse move action */
		mousemove(e: JQuery.Event): void

        /** performs the mouse out action */
		mouseout(e: JQuery.Event): void

        /** performs the touch end action */
		touchend(e: JQuery.Event): void

        /** performs the touch move action */
		touchmove(e: JQuery.Event): void

        /** performs the touch start action */
		touchstart(e: JQuery.Event): void
    }

    /**
     * is a child of the Canvas class and displays a periodic table of elements.
     * As with all components, it is completely customizable and interactive.
     */
    class PeriodicTableCanvas extends _Canvas {
        constructor(id: string, cellDimension: number)

        /** the padding between the sides of the component and the table */
		padding: number
        /** the width and height of each cell in the periodic table, 20 by default, but also specified in the constructor */
		cellDimension: number
		/** the currently hovered cell, or undefined if there is no cell hovered */
		hovered: structures.PeriodicCell | undefined
		/** the currently selected cell, or undefined if there is no cell selected */
		selected: structures.PeriodicCell | undefined

        /** draws the provided cell to the canvas that owns the Context using the given Styles, override this function to change the rendering of the table */
        drawCell(ctx: CanvasRenderingContext2D, styles: structures.Styles, cell: structures.PeriodicCell): void

        /** returns the Element object corresponding to the cell that is currently hovered by the mouse pointer, and returns undefined if no cell is hovered */
        getHoveredElement(): structures.Element | undefined

        /** catches double click events and selects a cell */
		click(e: JQuery.Event): void

        /** set to undefined to ignore this function from the _Canvas class */
		getMolecule(): structures.Molecule

        /** catches mouse move events and hovers a cell */
		mousemove(e: JQuery.Event): void

        /** catches mouse out events and sets the hovered cell to undefined */
		mouseout(e: JQuery.Event): void

        /** paints the periodic table */
		repaint(): void

        /** set to undefined to ignore this function from the _Canvas class */
		setMolecule(): void

        /** sets up the table and all the table cells, this function is called by the constructor, but can be called after changing the constructor defaults to re-layout the table */
		setupTable(): void

        /** catches the touchstart mobile event and hovers a cell */
		touchstart(e: JQuery.Event): void
    }

    /**
     * is a child of the Canvas class and provides a full sketcher for drawing chemical data, modeled off of the popular ChemDoodle 2D application.
     * This class is not avaialble in the ChemDoodle Web Components core.
     * It is added by including the ChemDoodle Web Components uis extensions.
     */
    class SketcherCanvas extends _Canvas {
        constructor(
            id: string,
            width: number,
            height: number,
            options: {
                isMobile?: boolean
                useServices?: boolean
                oneMolecule?: boolean
                includeToolbar?: boolean
                floatDrawTools?: boolean
                resizable?: boolean
                includeQuery?: boolean
            }
        )

        /** this is one of the options, controls whether the sketcher optimizes itself for mobile or desktop use;
         * if not defined, this option will automatically default to the correct value after checking if it's environemnt is mobile or not */
        isMobile: boolean
        /** this is one of the options, controls whether or not the sketcher will provide functionality that access iChemLabs Cloud services */
        useServices: boolean
        /** this is one of the options, controls whether or not the sketcher will provide full sketching capabilities, or restrict the interface to allow only a single molecule to be drawn */
        oneMolecule: boolean
        /** this is one of the options, define this to false to exclude the toolbar */
        includeToolbar: boolean
        /** this is one of the options, define this to true if you want to show a floating toolbar for the drawing tools as in ChemDoodle 2D */
        floatDrawTools: boolean
        /** this is one of the options, define this to true if you want the sketcher to be resizable by the user */
        resizable: boolean
        /** this is one of the options, define this to true to inlcude query tools in the toolbar */
        includeQuery: boolean
		/** the toolbar manager */
		toolbarManager: uis.gui.desktop.ToolbarManager
		/** the state manager */
		stateManager: uis.states.StateManager3D
		/** the history manager */
		historyManager: uis.actions.HistoryManager
		/** the copy/paste manager */
		copyPasteManager: uis.CopyPasteManager
		/** the cursor manager */
		cursorManager: uis.gui.desktop.CursorManager
		/** the TextInput object used for text input in custom labels */
		textInput: uis.gui.desktop.TextInput
		/**
         * if this is not undefined, the sketcher goes into modal mode and all input events are blocked;
         * this value is a pointer to the current modal popup, and is closed automatically when the user clicks on sketcher outside of the popover
         */
		modal: uis.gui.desktop.Popover
		/** if this is defined, there is a tray open on the floating toolbar, and this parameter is a pointer to that tray */
		openTray: uis.gui.desktop.Tray
		/** true if the user is hovering over the help icon */
		isHelp: boolean
		/** keeps track of the pinch gesture */
		lastPinchScale: number
		/** keeps track of the two finger rotate gesture */
		lastGestureRotate: number
		/** this keeps track of where the mouse is over the canvas, set in State */
		lastMousePos: structures.Point
		/** this keeps track of the last drag gesture position, set in State */
		lastPoint: structures.Point
		/** the atom that follows the pointer in the full sketcher */
		startAtom: structures.Atom
		/** the lasso, only declared in the full sketcher */
		lasso: uis.tools.Lasso

        /** confines the scale of the sketcher */
		checkScale(): void

        /** set up some internal variables on executing an action, currently checks query shapes for errors, override this for your custom sketcher listeners; if force is false, the function remembers that it should do this when next called by true, which is called in _Canvas.repaint() */
		checksOnAction(force: boolean): void

        /** draws extra graphics for the sketcher */
		drawSketcherDecorations(ctx: CanvasRenderingContext2D): void

        /** scales the event for the current scale of the sketcher */
		scaleEvent(e: JQuery.Event): void

        /** set up some internal variables before repainting */
		checksBeforeRepaint(): void

        /** performs the mouse click action */
		click(e: JQuery.Event): void

        /** performs the mouse dblclick action */
		dblclick(e: JQuery.Event): void

        /** performs the drag action */
		drag(e: JQuery.Event): void

        /** draws extra graphics on top of the base graphics */
		drawChildExtras(ctx: CanvasRenderingContext2D): void

        /** performs the gesturechange action */
		gesturechange(e: JQuery.Event): void

        /** performs the gestureend action */
		gestureend(e: JQuery.Event): void

        /** performs the keydown action */
		keydown(e: JQuery.Event): void

        /** performs the keypress action */
		keypress(e: JQuery.Event): void

        /** performs the keyup action */
		keyup(e: JQuery.Event): void

        /** performs the mousedown action */
		mousedown(e: JQuery.Event): void

        /** performs the mouseout action */
		mouseout(e: JQuery.Event): void

        /** performs the mouseover action */
		mouseover(e: JQuery.Event): void

        /** performs the mouseup action */
		mouseup(e: JQuery.Event): void

        /** performs the mousewheel action */
		mousewheel(e: JQuery.Event): void

        /** performs the mouse rightclick action */
		rightclick(e: JQuery.Event): void

        /** performs the rightmousedown action */
		rightmousedown(e: JQuery.Event): void

        /** performs the rightmouseup action */
		rightmouseup(e: JQuery.Event): void

        /** performs the touchend action */
		touchend(e: JQuery.Event): void

        /** performs the touchmove action */
		touchmove(e: JQuery.Event): void

        /** performs the touchstart action */
		touchstart(e: JQuery.Event): void
    }

    /** 
     * is a child of the Canvas class and provides a 3D molecular editing environment.
     * This class is not avaialble in the ChemDoodle Web Components core.
     * It is added by including the ChemDoodle Web Components uis extensions.
     */
    class EditorCanvas3D extends _Canvas3D {
        constructor(
            id: string,
            width: number,
            height: number,
            options: {
                isMobile?: boolean
                useServices?: boolean
                includeToolbar?: boolean
            }
        )

        /** this is one of the options, controls whether the sketcher optimizes itself for mobile or desktop use;
         * if not defined, this option will automatically default to the correct value after checking if it's environemnt is mobile or not */
        isMobile: boolean
        /** this is one of the options, controls whether or not the sketcher will provide functionality that access iChemLabs Cloud services */
        useServices: boolean
        /** this is one of the options, define this to false to exclude the toolbar */
        includeToolbar: boolean
        /** the toolbar manager */
		toolbarManager: uis.gui.desktop.ToolbarManager
		/** the state manager */
		stateManager: uis.states.StateManager
		/** the history manager */
		historyManager: uis.actions.HistoryManager

        /** performs the mouse click action */
		click(e: JQuery.Event): void

        /** performs the mouse dblclick action */
		dblclick(e: JQuery.Event): void

        /** performs the drag action */
		drag(e: JQuery.Event): void

        /** performs the keydown action */
		keydown(e: JQuery.Event): void

        /** performs the keypress action */
		keypress(e: JQuery.Event): void

        /** performs the keyup action */
		keyup(e: JQuery.Event): void

        /** performs the mousedown action */
		mousedown(e: JQuery.Event): void

        /** performs the mouseout action */
		mouseout(e: JQuery.Event): void

        /** performs the mouseover action */
		mouseover(e: JQuery.Event): void

        /** performs the mouseup action */
		mouseup(e: JQuery.Event): void

        /** performs the mousewheel action */
		mousewheel(e: JQuery.Event): void

        /** performs the mouse rightclick action */
		rightclick(e: JQuery.Event): void

        /** performs the rightmousedown action */
		rightmousedown(e: JQuery.Event): void

        /** performs the rightmouseup action */
		rightmouseup(e: JQuery.Event): void
    }

    /**
     * the StoichiometryTable class produces a chemically intelligent and self-calculating table for stoichiometry calculations.
     * It is modeled after the stoichiometry table tool in ChemDoodle 2D.
     * This component is based on a <table> element instead of a <canvas> element.
     */
    class StoichiometryTable {
        constructor(id: string, options: Object)

		/** this is the cancel button for the cell data input */
		buttonCancel: uis.gui.desktop.Button
		/** this is the clear button for the cell data input */
		buttonClear: uis.gui.desktop.Button
		/** this is the current state of the stoichiometry table */
		currentTableData: Object
		/** this is the jQuery reference to the table element in the DOM */
		tableContainer: Object

        /** closes the currently opened edit component for a cell in the table, committing the action only if the commit parameter is true */
		closeEdit(commit: boolean): void

        /** closes the currently opened edit component if the user clicks elsewhere on the page */
		closeEditCheckNotInEditDiv(): void

        /** 
         * produces the HTML for the edit component for the cells where users input values and units, returning the HTML as a String
         * @returns {string} html
         */
		makeEditComponent(): string

        /** 
         * produces the container HTML where the stoichiometry table will exist, returning the HTML as a String
         * @returns {string} html
         */
		makeTableContainer(): string

        /** handles the original creation of the stoichiometry table based on the input data; the data object can be either a String (written equation) or a drawn reaction  */
		serverSetup(data: Object): void

        /** handles the updating of the stoichiometry table given the updated table data */
		serverUpdate(currentTableData: JQuery.Event): void

        /** defines the user interactivity actions for the stoichiometry table and its cells */
		setupInteractivity(): void

        /** produces the HTML for the stoichiometry table based on the input tableData */
		setupStoichiometryTable(tableData: Object): void

        /** updates the DOM elements for the stoichiometry table based on the input tableData */
		updateStoichiometryTable(tableData: Object): void

    }

    /** this package contains helper functions for classes that the ChemDoodle Web Components library doesn't own. */
    module extensions {
        /** draws a ellipse given an input Context, x and y coordinates for the center position, and a width and height */
        function contextEllipse(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number): void

        /** draws a rounded rectangle given an input Context, x and y coordinates for the center position, height, width, and radius */
        function contextRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void

        /** 
         * generates a valid CSS font string based on the input parameters
         * @returns {string} html
         */
        function getFontString(size: number, family: string, bold: boolean, italic: boolean): string

        /** returns the angle between the two input vec3 objects */
        function vec3AngleFfrom(v1: vec3, v2: vec3): number
    }

    /** this package contains several convenience methods to check for support of verious HTML5 features that the ChemDoodle Web Components library uses. */
    module featureDetection {
        /** returns a boolean corresponding to the browser's support for the HTML5 <canvas> tag */
        function supports_canvas(): boolean

        /** returns a boolean corresponding to the browser's support for HTML5 <canvas> text rendering */
		function supports_canvas_text(): boolean

        /** returns a boolean corresponding to the browser's support for gesture events; this is useful for determining if the current browser can support pinching and zooming, and to resort to ChemDoodle's handlers if necessary */
		function supports_gesture(): boolean

        /** returns a boolean corresponding to the browser's support for touch events; this is useful for determining if the current browser is on a mobile platform */
		function supports_touch(): boolean

        /** returns a boolean corresponding to the browser's support for WebGL */
		function supports_webgl(): boolean

        /** this method checks the browser's support for XMLHttpRequest Level 2 functionality */
		function supports_xhr2(): boolean
    }

    /** 
     * this package connects to iChemLabs cloud services through AJAX XMLHttpRequest Level 2 for complete access to the entire ChemDoodle Java API.
     * Please see the {@link https://web.chemdoodle.com/docs/ichemlabs-cloud-services|iChemLabs Cloud services} documentation for details.
     */
    module iChemLabs {}

    /** this package hosts all classes that perform cheminformatics algorithms. */
    module informatics {
        /** returns the pixel/Ängstrom ratio that is currently defined by the default ChemDoodle settings */
		function getPointsPerAngstrom(): number

        /** is a class for analyzing bonds based on 3D coordinates */
        class BondDeducer {
			/** the amount of flexibility in calculating bonds; the larger the number, the more bonds found */
			margin: number

            /**
             * deduces covalent bonds for the input molecule and appends them to the molecule's bonds array.
             * Uses the covalent radii data provided in atomicData.
             * The customPointsPerAngstrom parameters allows you to change the value from that specified by default.
             */
		    deduceCovalentBonds(molecule: structures.Molecule, customPointsPerAngstrom: number): void
        }

        /** is a class for manipulating hydrogens */
        class HydrogenDeducer {
            /**
             * removes all hydrogens and bonds attached to them from the given molecule;
             * if removeStereo is not set to true, then hydrogens connected with wedge bonds are retained
             */
		    removeHydrogens(molecule: structures.Molecule, removeStereo: boolean): void
        }

        /** is a class for splitting a Molecule data structure composed of discrete graphs into individual discrete Molecule objects */
        class Splitter {
            /** returns an array consisting of each discrete graph data structure in the input molecule, as individual discrete Molecule objects */
		    split(molecule: structures.Molecule): structures.Molecule[]
        }

        /** is a class for copying and creating molecular structures */
        class StructureBuilder {
            /** returns a new Molecule object that is a copy of the input Molecule */
		    copy(molecule: structures.Molecule): structures.Molecule 
        }

        /**
         * is an interface for calculating integer descriptors given a Molecule object.
         * It should not be instantiated.
         * To obtain a value from a Counter, use the following command where mol is a Molecule object and ChildOfCounter is a child of the Counter class:
         * new ChildOfCounter(mol).value
         */
        abstract class _Counter {
			/** the result of the Counter algorithm */
			value: number
			/** holds the Molecule object being analyzed by the child derivative */
			molecule: structures.Molecule

            /** 
             * sets the molecule and performs the descriptor calculation.
             * Should be called as the last method in all child constructors.
             */
            setMolecule(molecule: structures.Molecule): void
            
            /**
             * this method is defined by all child classes of Counter.
             * This method should calculate the descriptor value given the Molecule stored.
             */
            abstract innerCalculate(molecule: structures.Molecule): void
        }

        /** is a child of the Counter class and calculates the Frèrejacque Number, which is the SSSR count. */
        class FrerejacqueNumberCounter extends _Counter {
            constructor(molecule: structures.Molecule)

            /** calculates the Frèrejacque Number. This should never be manually called as it is called by the constructor after setup. */
		    innerCalculate(molecule: structures.Molecule): void
        }

        /** is a child of the Counter class and calculates the real number of molecules in a Molecule object, which can hold disjoint graphs. */
        class NumberOfMoleculesCounter extends _Counter {
            constructor(molecule: structures.Molecule)

            /** calculates the number of molecules. This should never be manually called as it is called by the constructor after setup. */
		    innerCalculate(molecule: structures.Molecule): void
        }

        /**
         * is an interface for ring perception algorithms.
         * It should not be instantiated. 
         * Contains helper methods for ring perception and for storing rings.
         * So to obtain a ring set, use the following command where mol is a Molecule object and ChildOfRingFinder is a child of the RingFinder class:
         * new ChildOfRingFinder(mol).rings */
        abstract class _RingFinder {
			/** all atoms that will be analyzed during ring perception are stored here, set by RingFinder.reduce() */
			atoms: structures.Atom[]
			/** all bonds that will be analyzed during ring perception are stored here, set by RingFinder.reduce() */
			bonds: structures.Bond[]
			/** this array holds all the perceived rings */
			rings: structures.Ring[]

            /** a helper method to find the bonds that belong to the perceived rings if only the atoms are specified. */
		    fuse(): void

            /** reduces this input molecule graph to discard most non-ring atons and all lone atoms to speed up runtimes, sets the atoms and bonds Arrays to the reduced graph. */
		    reduce(molecule: structures.Molecule): void

            /** sets the molecule and performs the ring perception. Should be called as the last method in all child constructors. */
		    setMolecule(molecule: structures.Molecule): void

            /** this method is defined by all child classes of RingFinder. This method should find rings based on the reduced atoms and bonds Arrays and then place perceived rings in the rings Array. */
		    abstract innerGetRings(molecule: structures.Molecule): void
        }

        /** 
         * perceives the Smallest Set of Smallest Rings (SSSR) as defined by Plotkin.
         * The SSSR set is not unique.
         * This is not a child of the RingFinder class, as it uses the EulerFacetRingFinder class to perceive rings, and the SSSR is retrieved from that result.
         * It works identically to a RingFinder derivative.
         */
        class SSSRFinder {
            constructor(molecule: structures.Molecule)

			/** this array holds all the perceived rings */
			rings: structures.Ring[]
        }

        /**
         * is a child of the RingFinder class and perceives a set of rings that defines all Euler facets in a molecule using an algorithm developed by Kevin Theisen.
         * This ring set is thorough, unique and adequately describes rings as a 3D representation of a 2D drawing.
         */
        class EulerFacetFinder extends _RingFinder {
			/** 
             * is a cutoff for the size of rings to be found.
             * Defines the length of a ring path which is half of a ring.
             * So a value of 5 specifies that only 8 membered rings and smaller should be perceived.
             * Use this setting to improve performance.
             */
			fingerBreak: number

            /** 
             * implements the algorithm to find the Euler facet ring set.
             * This should never be manually called as it is called by the constructor after setup.
             */
		    innerGetRings(molecule: structures.Molecule): void
        }
    }

    /** this package contains various classes and tools for converting chemical data between formats. */
    module io {
        /** recover a Molecule from JSON format */
		function fromJSONDummy(content: Object): structures.Molecule

        /** convert a Molecule to a consise Object that represents the chemical data for use in JSON protocol */
		function toJSONDummy(mol: structures.Molecule): Object

        /**
         * is an interface for reading and writing chemical data.
         * It should not be instantiated.
         * Contains helper methods for dealing with data.
         */
        abstract class _Interpreter {
            /** helper method for formating data in MDL-like syntaxes. */
		    fit(data: string, length: number, leftAlign: boolean): void
        }

        /** handles converting Javascript objects to and from the ChemDoodle JSON format, this is NOT a child of the Interpreter class */
        class JSONInterpreter {
            constructor()

            /** 
             * given the input object represented in ChemDoodle JSON (object, not the string),
             * this function will create the corresponding Object data structure containing an Array of Molecule data structures named molecules and an Array of Shape data structures named shapes
             */
		    contentFrom(dummy: Object): Object

            /**
             * creates a dummy object from the input molecules and shapes Arrays corresponding to the ChemDoodle JSON format;
             * use JSON.stringify() to create a JSON string from this dummy object
             */
		    contentTo(mols: structures.Molecule[], shapes: structures.d2._Shape): Object

            /** given the input object represented in ChemDoodle JSON (object, not the string), this function will create the corresponding Molecule data structure */
		    molFrom(dummy: Object): structures.Molecule

            /** creates a dummy object from the input Molecule data structure corresponding to the ChemDoodle JSON format; use JSON.stringify() to create a JSON string from this dummy object */
		    molTo(mol: structures.Molecule): Object

            /** given the input object represented in ChemDoodle JSON (object, not the string), this function will create the corresponding Query data structure */
		    queryFrom(dummy: Object): structures.Query

            /** creates a dummy object from the input Query data structure corresponding to the ChemDoodle JSON format; use JSON.stringify() to create a JSON string from this dummy object */
		    queryTo(mol: structures.Molecule): Object

            /** given the input object represented in ChemDoodle JSON (object, not the string), this function will create the corresponding Shape data structure; the second parameter is the array of molecules already read, just incase the shape is dependent upon them */
		    shapeFrom(dummy: Object, mols: structures.Molecule[]): structures.d2._Shape

            /** creates a dummy object from the input Shape data structure corresponding to the ChemDoodle JSON format; use JSON.stringify() to create a JSON string from this dummy object */
		    shapeTo(shape: structures.d2._Shape): Object
        }

        /** reads IUPAC JCAMP-DX files, is a child of the Interpreter class */
        class JCAMPInterpreter extends _Interpreter {
            constructor()
			/** if true, and the file being read is a NMR spectrum in HZ, then the interpreter will automatically convert the x-axis into PPM */
			convertHZ2PPM: Boolean

            /** given an input JCAMP file with structure colleration data, this function creates two canvases,
             * one for a molecule and one for the spectrum,
             * where each has hover events (or touch on mobile) to highlight peaks and the corresponding parts of the molecular structure;
             * the input id is used to generate the canvases, or find previously created canvases;
             * the array that is returned contains the molecule ChemDoodle Web Component and the spectrum ChemDoodle Web Component objects in that order */
		    makeStructureSpectrumSet(id: string, content: string): (structures.Molecule | structures.Spectrum)[]

            /** reads the JCAMP file content and returns the corresponding Spectrum */
		    read(content: string): structures.Spectrum
        }

        /** reads and writes MDL MOLFiles, both v2000 and v3000, is a child of the Interpreter class */
        class MOLInterpreter extends _Interpreter {
            constructor()
            /** when writing V3000 MOLFiles by instantiating this class, first set this parameter to 3 */
		    version: number

            /** 
             * reads MOLFile content and returns the corresponding molecule;
             * this function will automatically detect v2000 and v3000 MOLFiles and handle them accordingly;
             * the optional multiplier variable will override the default_anstromsPerBondLength variable, set it to 1 for 3D scenes in Angstroms
             */
		    read(content: string, multiplier?: number): structures.Molecule

            /** writes and returns a String containing the MOLFile of the given molecule */
            write(molecule: structures.Molecule): string
        }

        /** reads and writes MDL RXNFiles (v2000), is a child of the Interpreter class */
        class RXNInterpreter extends _Interpreter {
            constructor()
            /**  
             * reads RXNFile content and returns an object containing the corresponding content.
             * The Object possesses an array of Molecules which an be accessed with the name 'molecules' and a shape array by the name of 'shapes' which contains only one Line data structure representing the arrow.
             * The optional multiplier variable will override the default_anstromsPerBondLength variable, set it to 1 for 3D scenes in Angstroms
             */
            read(content: string, multiplier?: number): structures.Molecule

            /** writes and returns a String containing the RXNFile of the given molecules and shapes */
            write(molecules: structures.Molecule, shapes: structures.d2._Shape): string
        }

        /** reads XYZ files, is a child of the Interpreter class */
        class XYZInterpreter extends _Interpreter {
            constructor()
            /** if true, the XYZInterpreter will also calculate covalent bonds for input atoms */
            deduceCovalentBonds: structures.Molecule

            /** reads XYZ file content and returns the corresponding molecule */
    		read(content: string): structures.Molecule
        }

        /** reads RCSB PDB files, is a child of the Interpreter class */
        class PDBInterpreter extends _Interpreter {
            constructor()
            /** if true, the PDBInterpreter deduce bonds between residue atoms */
		    deduceResidueBonds: structures.Molecule
            /** if true, the PDBInterpreter will also calculate distances for all protein and nucleic acid atoms to the closest ligand atoms for use in display. If no ligand atoms are present, then all atoms will be given a measured distance of 0 */
		    calculateRibbonDistances: structures.Molecule

            /** 
             * reads the PDB file content and returns the corresponding Molecule;
             * the optional multiplier variable will override the default_anstromsPerBondLength variable, set it to 1 for 3D scenes in Angstroms */
            read(content: string, multiplier?: number): structures.Molecule
        }

        /** reads Crystallographic Information Files (CIF), is a child of the Interpreter class */
        class CIFInterpreter extends _Interpreter {
            constructor()
            /** 
             * Given the lengths and angles of the unit cell,
             * a matrix is calculated (represented in an Array) of the transform matrix from ABC coordinates to XYZ coordinates
             * 
             * @param {number} a Angstroms
             * @param {number} b Angstroms
             * @param {number} c Angstroms
             * @param {number} alpha radians
             * @param {number} beta radians
             * @param {number} gamma radians
             */
		    static generateABC2XYZ(a: number, b: number, c: number, alpha: number, beta: number, gamma: number): number[][]

            /** 
             * reads a CIF file and returns the corresponding Molecule and unit cell shape;
             * the returned object will contain two parameters, molecule and unitCell;
             * the three optional integers specify the supercell dimensions, by default they are all 1,
             * so reading a file without specifying these parameters will produce just the unit cell.
             * In addition to reading atoms from CIF files,
             * this interpreter will also produce a unit cell and other objects relevant to the display of periodic information
             */
		    read(content: string, xSuper: number, ySuper: number, zSuper: number): structures.Molecule
        }

        /** 
         * reads Chemical Markup Language files, is a child of the Interpreter class.
         * Currently supports molecules only, no reactions.
         */
        class CMLInterpreter extends _Interpreter {
            constructor()

            /** 
             * reads CML content and returns an object containing the corresponding content.
             * The Object possesses an array of Molecules which an be accessed with the name 'molecules'.
             */
		    read(content: string): Object

            /** writes and returns a String containing the CML of the given molecules. */
            write(molecules: structures.Molecule): string
        }

        /** this package deals with files. */
        module file {
            /**
             * retrieves the content of a file given an input url; 
             * the content is sent to the callback function provided; 
             * note that this function uses AJAX, so it will only work for files local to the same origin calling it, 
             * unless the server supports XHR2
             */
		    function content(url: string, callback: Function): void
        }

        /** this package generates Portable Network Grpahics (PNG) images from canvases. */
        module png {
            /** 
             * creates a PNG image from the input Canvas object and downloads the file to the user's default download location.
             * The name of the file is the second parameter, which will default to "unnamed" if not provided.
             */
		    function download(canvas: _Canvas, filename?: string): void

            /** creates a PNG image from the input Canvas object and opens it in a new window or tab based on the user's browser settings. */
		    function open(canvas: _Canvas): void

            /** 
             * creates a PNG image from the input Canvas object as a String and returns it;
             * the String will be prepended with "data:image/png;base64,".
             */
		    function string(canvas: _Canvas): string
        }

        /** 
         * this package generates Web Scalable Vector Graphics (SVG) images from canvases.
         * This class can only generate SVGs for 2D Canvases.
         * (Proprietary Only)
         */
        module svg {
            /** 
             * creates a SVG image from the input Canvas object and downloads the file to the user's default download location.
             * The name of the file is the second parameter, which will default to "unnamed" if not provided.
             */
		    function download(canvas: _Canvas, filename?: string): void

            /** creates a SVG image from the input Canvas object and opens it in a new window or tab based on the user's browser settings. */
		    function open(canvas: _Canvas): void

            /** creates a SVG image from the input Canvas object as a String and returns it. */
		    function string(canvas: _Canvas): string
        }
        
    }

    /** this package contains various mathematical algorithms. */
    module math {
        /**
         * returns an object with two parameters (angle, largest);
         * angle points between the largest gap of the input Array of angles in radians,
         * largest is the value of the angle between the bonds of the largest gap in radians
         */
		function angleBetweenLargest(data: Object): number

        /** this is a helper method to alter an angle in radians to be between 0 and 2pi and with an additional parameter to convert to degrees and a last parameter to constrain under Pi (so it will give the 2Pi complement) */
		function angleBounds(value: number, convertToDegrees: boolean, constrainToPi: boolean): number

        /**
         * returns the distance of a line inscribed in a rectangle, given that the line has only 1 endpoint in the rectangle;
         * the rectangle is a object with self-explanatory parameters x, y, w, and h
         */
		function calculateDistanceInterior(to: structures.Point, from: structures.Point, r: Object): number

        /**
         * return the value if it is between the min and max, inclusive; returns the min if the value is less than the min,
         * returns the max if the value is greater than the max
         */
		function clamp(value: number, min: number, max: number): number

        /**
         * returns the shortest (tangent) distance from the input Point to the line with endpoints defined by the last two input Points.
         * This works by rotating the frame such that the line starts at the origin and points up along the x-axis,
         * and the absolute value of the rotated input Point x-coordinate is returned.
         *  If the input Point's y-coordinate is not between the endpoints, inclusively, a value of -1 is returned.
         * The retract parameter is optional and will buffer the ends of the line from hitting with that magnitue if provided.
         */
		function distanceFromPointToLineInclusive(p: structures.Point, l1: structures.Point, l2: structures.Point, retract: number): number

        /** returns a 3 membered Array of Numbers corresponding to the RGB magnitudes of the input hex string and multiplied by the input multiplier */
		function getRGB(hex: string, mutliplier: number): number[]

        /** convert HSL (values between 0 and 1) color to RGB values */
		function hsl2rgb(h: number, s: number, l: number): number[]

        /** this is a helper method for our WebGL picking system */
		function idx2color(value: number): string

        /** returns the intersection of two non-parallel line segments, if they intersect */
		function intersectLines(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): structures.Point

        /** returns true if the first input parameter is between the last two input parameters, inclusively */
		function isBetween(x: number, left: number, right: number): boolean

        /** return true if the Point pt is in Polygon poly */
		function pointInPoly(poly: Object, pt: structures.Point): boolean

        /** returns an rgb color as a CSS string, this is a helper function for the rainbow coloring in ribbons */
		function rainbowAt(i: number, ii: number, colors: string[]): string
 

        /** manages 2D and 3D bounds information for graphical objects */
        class Bounds {
            constructor()

            /** the minimum X value for the rectangle that represents these bounds */
            minX: number
            /** the minimum Y value for the rectangle that represents these bounds */
            minY: number
            /** the maximum X value for the rectangle that represents these bounds */
            maxX: number
            /** the maximum Y value for the rectangle that represents these bounds */
            maxY: number
            /** the minimum Z value for the rectangular prism that represents these bounds */
            minZ: number
            /** the maximum Z value for the rectangular prism that represents these bounds */
            maxZ: number

            /** 
             * this Bounds object will expand the bounds of the current rectangle using the x and y data provided;
             * two sets of coordinates can be provided, but the second set is optional (this way you can expand by point or by rectangle)
             */
	    	expand(x1: number, y1: number, x2: number, y2: number): void

            /** 
             * this Bounds object will expand the bounds of the current rectangle
             * (or rectangular prism, if z coordinate information is provided)
             * using the Bounds data provided by the bounds2 parameter
             */
    		expand(bounds2: math.Bounds): void

            /** 
             * this Bounds object will expand the bounds of the current rectangular prisms using the x, y and z data provided;
             * two sets of coordinates can be provided, but the second set is optional
             * (this way you can expand by point or by rectanglular prism)
             */
		    expand3D(x1: number, y1: number, x2: number, y2: number, z1: number, z2: number): void
        }
    }

    /** 
     * this package keeps track of user input on the current page,
     * such as the Canvas that is focused and what modifier keys are pressed on the keyboard
     */
    module monitor {
		/** keeps track of whether the shift key is held down */
		const SHIFT: Boolean
		/** keeps track of whether the alt key is held down */
		const ALT: Boolean
		/** keeps track of whether the operating system specific meta key is held down (CTRL on Windows/Linux, CMD on Mac) */
		const META: Boolean
        /**
         * keeps track of the canvas that the mouse is currently over.
         * This is undefined if the mouse is over no canvas
         */
        const CANVAS_OVER: _Canvas | undefined
        /**
         * keeps track of the canvas that the mouse is currently dragging from.
         * This is undefined if no Canvas is currently being dragged from
         */
        const CANVAS_DRAGGING: _Canvas | undefined
    }

    module structures {
        
        /**
         * is data structure for holding information about an element.
         * This is a private class that cannot be instantiated, however, the Elements in the ELEMENT array can be extended.
        */
        class Element {}

        /**
         * represents a 2D point and contains functions for various 2D geometric calculations
         */
        class Point {
            x: number
            y: number
        }

        /** represents a chemical atom */
        class Atom {}

        class Ring {}

        /** represents a chemical bond */
        class Bond {}

        /** represents a chemical molecule */
        class Molecule {
            atoms: Atom[]

            /**
             * Returns a Point that specifies the width and height of this Molecule in the XY plane.
             *
             * Among other uses, this method can be used to first find the dimensions of a molecule
             * to set the dimensions of a Canvas to perfectly fit it (make sure to add some aesthetic buffer space).
             */
            getDimension(): Point

            /**
             * Scales the molecule so that the average bond length equals the input length.
             *
             * This is a 2D function.
             */
            scaleToAverageBondLength(length: number): void
        }

        /** data structure to hold spectrum information */
        class Spectrum {}

        /**
         * is data structure for holding information about a single cell in the periodic table for the PeriodicTableCanvas.
         * This is a private class that cannot be instantiated.
         */
        class PeriodicCell {}

        /** The Styles structure contains all the variables that define how all objects are drawn on the canvas. */
        class Styles {
            bonds_width_2D: number
            bonds_hashSpacing_2D: number
            bonds_wedgeThickness_2D: number
            atoms_font_size_2D: number
        }

        class Query {}

        module d2 {
            class _Shape {}
        }

        module d3 {
            class Shape {}
        }
    }
  
    module uis {

        class CopyPasteManager {}

        module actions {
            class HistoryManager {}
        }

        module tools {
            class Lasso {}
        }

        module states {
            class StateManager {}

            class StateManager3D {}
        }
      module gui {
        module desktop {
            class Button {}

            class CursorManager {}

            class TextInput {}

            class Tray {}

            class Popover {}
          /** this class organizes and manages the toolbars for the sketcher. */
          class ToolbarManager {
            /** sets up the HTML with jQuery UI */
            setup(): void
          }
        }
      }
    }
  }
  
  export default ChemDoodle
  